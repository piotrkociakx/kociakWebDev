import * as yaml from 'js-yaml';

function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function loadYamlFile(argument1: string): Promise<any> {
  const url = `http://83.168.69.206/plugins/getConfig/${argument1}`;
  const response = await fetch(url, { mode: 'no-cors' });
  const yamlText = await response.text();  // Możesz napotkać problem z dostępem do odpowiedzi
  const data = yaml.load(yamlText);
  return data;
}

async function loadPluginData(argument1: string): Promise<any> {
  const url = `http://83.168.69.206/plugins/get/${argument1}`;
  const response = await fetch(url, { mode: 'no-cors' });
  const data = await response.json();  // Możesz napotkać problem z dostępem do odpowiedzi
  return data;
}


async function displayYaml() {
  try {
    const argument1 = getQueryParam('name');
    
    if (!argument1) {
      throw new Error('Parameter "name" is missing in the URL');
    }

    const pluginData = await loadPluginData(argument1);

    const nameSpan = document.getElementById('name');
    const descParagraph = document.getElementById('desc');
    const youtubeIframe = document.getElementById('youtube') as HTMLIFrameElement;

    if (nameSpan) {
      nameSpan.textContent = pluginData.name;
    }

    if (descParagraph) {
      descParagraph.textContent = pluginData.description;
    }

    if (youtubeIframe) {
      youtubeIframe.src = pluginData.youtube;
    }


    const yamlData = await loadYamlFile(argument1);
    const outputDiv = document.getElementById('configYaml');

    if (outputDiv) {
      outputDiv.innerHTML = `<pre>${JSON.stringify(yamlData, null, 2)}</pre>`;
    }
  } catch (error) {
    console.error('Error loading plugin data or parsing YAML file:', error);
  }
}

window.onload = displayYaml;
