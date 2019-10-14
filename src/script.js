import sketch from 'sketch'

const ui = sketch.UI
const document = sketch.getSelectedDocument()
const library = sketch.getLibraries().filter((l) => l.libraryType == 'User')
const librarySymbols = library.flatMap((l) => l.getImportableSymbolReferencesForDocument(document))
const selected = document.selectedLayers.layers

// look for clean symbol sources
let findSymbol = (layerName) => {
  let search = librarySymbols.find((s) => s.name == layerName)

  if(search){
    search = search.import()
  } else {
    search = null
  }
  return search
}

// clean the dirty symbol sources with now ones
let cleanSources = (layer) => {
  let symbolsToClean = layer.overrides.filter((o) => o.symbolOverride)
  layer.master = findSymbol(layer.master.name)

  symbolsToClean.forEach((l) => {
    let symbolSource = {}

    // get source symbol
    if(l.isDefault){
      symbolSource = findSymbol(l.affectedLayer.master.name)
    } else {
      symbolSource = findSymbol(context.document.documentData().symbolWithID(l.value).name())
    }

    // update symbol
    if(symbolSource){
      layer.setOverrideValue(l, symbolSource.symbolId)
    } else {
      ui.alert('Error', 'Library for "' + l.affectedLayer.name + '" not found!')
    }
  })
}

// run the process
let process = (layers, detach) => {
  let groupCount = layers.filter((l) => l.type == 'Group').length

  layers.forEach((l) => {
    if(l.type == 'Group'){
      process(l.layers, detach)
    } else if(l.type == 'SymbolInstance'){
      cleanSources(l)
      if(detach) l.detach()
    }
  })

  const rocket = String.fromCodePoint(128640)
  if(groupCount === 0) ui.message(rocket + ' All symbols have been fixed! ' + rocket)
}

// handler functions
export function processFix(){ return process(selected, false) }
export function processDetach(){ return process(selected, true) }
