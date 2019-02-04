# Google I/O 2019 Transmission Debugger

Install tools:

```bash
npm install
```

## Decode video (into `frames` directory):

```bash
./bin/decode svd_720.mp4
```

## Detect cross frames (into `goodframes` directory):

```bash
./bin/detect
```

## Build blended frame (into `output` directory):

```bash
./bin/merge
```

## Test Math in Frames

```bash
./bin/finddots
```

## Test With Regard To The Poem

```bash
./bin/solve
```

## Play Transmission in Chrome Console

```bash
python -m SimpleHTTPServer 1234
```

Then open http://localhost:1234/dance/
