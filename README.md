# convit-cli

This is a simple to use CLI tool to convert, optimize, and resize Images.

## Installation

```sh
npm install convit-cli
```

**Notice**: There is a chance that windows users might not be able use this command-line tool.

## Simple usage

```sh
convit -f input.png -t webp
```

## Commands

##### Interactive Mode **(recommended)**

To convert or resize your images you can use the interactive mode, so by answering some questions you can can manipulate them easily.

**Example:**

```sh
convit i
```

```sh
convit interactive
```

## Help

Run the following command to see all available options and commands.

```sh
convit help
```

## Options

If you prefer to use option over the interactive mode, you can use the following options for now.

- **_required_** `[--files | -f] <path>` Use this option to specify the files you want to manipulate. **Note** that you also can specify a directory which contains you images as a value.**(remember that convit-cli only look for images inside the directory and won't look for images inside subdirectories of the specified directory.)**

- **_required_** `[--convert-to | --to | -t]` Use this option to specify your desired output format. Supported formats are:
  - webp
  - jpeg
  - png
  - avif
  - tiff
- `[--output | -o]` Use this option to determine the output directory.
- `[--size | -s]` Use this option to specify the size of the images you intend to manipulate. The value for this option should follow the following **Format**: `widthxheight`, ex. `convit -f image.jpeg -t webp -s 1900x1600`.
- `[--widht | -w]` Use this option to specify the width of your images. ex. `convit -f image.jpeg -t webp -w 1900`
- `[--height | -h]` Use this option to specify the height of your images. ex. `convit -f image.jpeg -t webp -h 1900`
- `[--quality | -q]` Use this option to specify the height of your images. **Note** that valid value range for this option starts from 0 to 100. ex. `convit -f image.jpeg -t webp -q 50`
