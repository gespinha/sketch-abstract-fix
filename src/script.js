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
  let layerMasterSource = findSymbol(layer.master.name)

  // fix base layer source
  if(layerMasterSource && layer.master !== layer.master.name) layer.master = layerMasterSource

  // loop through overrides
  for(var i = 0; i < symbolsToClean.length; i++){
    let thisSymbol = symbolsToClean[i]
    let symbolSource = null

    // get source symbol
    if(thisSymbol.isDefault){
      symbolSource = findSymbol(thisSymbol.affectedLayer.master.name)
    } else {
      let symbolContext = context.document.documentData().symbolWithID(thisSymbol.value)
      symbolSource = symbolContext ? findSymbol(symbolContext.name()) : null
    }

    // update symbol
    if(symbolSource){
      if(thisSymbol.value !== symbolSource.symbolId) layer.setOverrideValue(thisSymbol, symbolSource.symbolId)
    } else {
      ui.alert('Error', 'Library for "' + thisSymbol.affectedLayer.name + '" not found!')
    }
  }
}

// run the process
let process = (layers, detach) => {
  let groupCount = layers.filter((l) => l.type == 'Group').length

  for(var i = 0; i < layers.length; i++){
    let thisLayer = layers[i]

    if(thisLayer.type == 'Group'){
      process(thisLayer.layers, detach)
    } else if(thisLayer.type == 'SymbolInstance'){
      let result = cleanSources(thisLayer)
      if(detach) thisLayer.detach()
    }
  }
}

// success message
let success = (message) => {
  const rocket = String.fromCodePoint(128640)
  return ui.message(rocket + ' ' + message + ' ' + rocket)
}

// handler functions
export function processFix(){
  process(selected, false)
  return success('All symbols have been fixed!')
}
export function processDetach(){
  process(selected, true)
  return success('All symbols have been fixed!')
}
