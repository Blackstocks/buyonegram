import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ASSETS_DIR = './src/assets';
const ALL_IMAGES_DIR = './src/assets/all images';
const OUTPUT_DIR = './src/assets/optimized';
const PRODUCT_DIRS = ['products', 'hero', 'clients', 'bog', 'team leads images'];
const SPECIAL_DIRS = [
  { input: '500gm', output: '500gm' },
  { input: '5&30', output: '5&30' }
];
const MAX_WIDTH = 800; // Maximum width for product images
const QUALITY = 80; // Image quality (0-100)

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Process all images in the specified directories
async function processImages() {
  console.log('Starting image optimization...');
  
  // Process standard directories
  for (const dir of PRODUCT_DIRS) {
    const dirPath = path.join(ALL_IMAGES_DIR, dir);
    
    // Handle 'team leads images' with a cleaner output directory name
    const outputDirName = dir === 'team leads images' ? 'team' : dir;
    const outputDirPath = path.join(OUTPUT_DIR, outputDirName);
    
    // Skip if directory doesn't exist
    if (!fs.existsSync(dirPath)) {
      console.log(`Directory ${dirPath} doesn't exist, skipping...`);
      continue;
    }
    
    // Create output directory
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }
    
    // Process all images in the directory
    await processDirectory(dirPath, outputDirPath);
  }
  
  // Process special directories
  for (const { input, output } of SPECIAL_DIRS) {
    const inputDirPath = path.join(ALL_IMAGES_DIR, input);
    const outputDirPath = path.join(OUTPUT_DIR, output);
    
    // Skip if directory doesn't exist but create it if needed for output
    if (!fs.existsSync(inputDirPath)) {
      console.log(`Directory ${inputDirPath} doesn't exist, creating empty output directory...`);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }
      continue;
    }
    
    // Create output directory
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }
    
    // Process all images in the directory
    await processDirectory(inputDirPath, outputDirPath);
  }
  
  console.log('Image optimization complete!');
}

// Helper function to process a directory of images
async function processDirectory(inputDir, outputDir) {
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const outputFilePath = path.join(outputDir, file.replace(/\.\w+$/, '.webp'));
    
    // Skip directories
    if (fs.statSync(filePath).isDirectory()) {
      continue;
    }
    
    // Skip non-image files
    if (!/\.(png|jpg|jpeg|gif|webp|avif)$/i.test(file)) {
      continue;
    }
    
    try {
      // Get image info
      const metadata = await sharp(filePath).metadata();
      const width = Math.min(metadata.width, MAX_WIDTH);
      
      // Optimize and save image
      await sharp(filePath)
        .resize(width) // Resize to max width while maintaining aspect ratio
        .webp({ quality: QUALITY }) // Convert to WebP format
        .toFile(outputFilePath);
      
      // Get size information
      const originalSize = fs.statSync(filePath).size;
      const optimizedSize = fs.statSync(outputFilePath).size;
      const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
      
      console.log(`Optimized: ${file} (${reduction}% reduction) [${(originalSize/1024/1024).toFixed(2)}MB → ${(optimizedSize/1024/1024).toFixed(2)}MB]`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
}

processImages().catch(console.error); 