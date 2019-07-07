let ctx = new AudioContext();

async function loadSampleAudio() {
  const audioFile = await fetch('../helpers/test-audio.mp3');
  const ab = await audioFile.arrayBuffer();
  const sound = await decodeAudio(ab);
  return sound;
}

async function decodeAudio(ab) {
  return new Promise(resolve => {
    ctx.decodeAudioData(ab, resolve);
  });
}

async function main(){
  const testAudio = await loadSampleAudio();
  let source;
  const slider = document.querySelector('input');
  slider.addEventListener('input', ({target: { value }}) => {
    const offset = testAudio.duration * value;
    if (source) {
      source.stop();
    }
    source = ctx.createBufferSource();
    source.buffer = testAudio;
    source.connect(ctx.destination);
    source.start(0, offset);
  })
  source.start(0, 0);
}

main()