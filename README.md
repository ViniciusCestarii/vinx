# vinx

A personal CLI tool for creating silly and useful commands, built by Vinicius Cestari.

## Installation

```bash
npm install -g vinx
```

## Usage

Currently available commands:

### `echo`

Prints the provided text to the console.

```bash
vinx echo "Hello, World!"
```

### `mood`

Analyzes the mood of a GitHub user based on their recent commit messages.

```bash
vinx mood ViniciusCestarii

# Show detailed mood statistics
vinx mood ViniciusCestarii --status
vinx mood ViniciusCestarii -s
```

### `sha`

Calculates the hash of the provided text using the specified algorithm (default: `sha256`).

```bash
vinx sha "Hello, World!"
vinx sha "Hello, World!" --algorithm sha512
vinx sha "Hello, World!" -a sha512
```

## Development

### Development

1. Clone the repository
  ```bash 
  git clone https://github.com/ViniciusCestarii/vinx.git
  cd vinx
  ```

2. Install the dependencies
  ```bash
  npm install
  ```

3. Run locally
  ```bash
  npm run dev
  ```

> You can try `npm run dev echo "Hello World!"`

### Building

1. Build the project
  ```bash
  npm run build
  ```

2. Run locally the builded js
  ```bash
  npm run cli
  ```

> You can try `npm run cli echo "Hello World!"`

## Contributing

Feel free to open issues and pull requests!

## License

[IMT](https://github.com/ViniciusCestarii/modular-pets/blob/main/LICENSE)