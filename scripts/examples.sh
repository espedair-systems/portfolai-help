#!/bin/bash
# scripts/examples.sh - Generates example processed images using Imaginarium CLI

set -e

# Paths
WORKSPACE="/run/media/jonk/Workspace/ACTIVE/IMAGE"
IMAGINARIUM_CLI="$WORKSPACE/portfolai-imaginarium/target/release/imaginarium"
EXAMPLES_DIR="$WORKSPACE/portfolai-help/examples"
ASSETS_DIR="$WORKSPACE/portfolai-help/src/assets"

# Create assets directory if it doesn't exist
mkdir -p "$ASSETS_DIR"

echo "Using Imaginarium CLI at: $IMAGINARIUM_CLI"

# --- 1. Sobel Edge Detection ---
echo "Generating Sobel Edge Detection example..."
# Copy original
cp "$EXAMPLES_DIR/cameraman.jpeg" "$ASSETS_DIR/cameraman.jpg"
# Process output
"$IMAGINARIUM_CLI" convert \
  --sobel \
  "$EXAMPLES_DIR/cameraman.jpeg" \
  "$ASSETS_DIR/cameraman_sobel.png"

# --- 2. Morphological Dilation ---
echo "Generating Morphological Dilation example..."
# Copy original
cp "$EXAMPLES_DIR/pepper.jpeg" "$ASSETS_DIR/pepper.jpg"
# Process output
"$IMAGINARIUM_CLI" convert \
  --dilate 3 \
  "$EXAMPLES_DIR/pepper.jpeg" \
  "$ASSETS_DIR/pepper_dilated.png"

echo "All examples generated successfully!"
