import * as yaml from 'js-yaml';

async function loadYamlFile(filePath: string): Promise<any> {
  const response = await fetch(filePath);
  const yamlText = await response.text();
  const data = yaml.load(yamlText);
  return data;
}

async function displayYaml() {
  try {
    const yamlData = await loadYamlFile('/path/to/data.yml');
    const outputDiv = document.getElementById('configYaml');

    if (outputDiv) {
      outputDiv.innerHTML = `<pre>${JSON.stringify(yamlData, null, 2)}</pre>`;
    }
  } catch (error) {
    console.error('Error loading or parsing YAML file:', error);
  }
}

window.onload = displayYaml;
