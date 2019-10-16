# Abstract Fix

## Overview

[Abstract](https://abstract.com) is an amazing product that allows you to keep track of your file changes and version history. However, to keep a git-like kind of experience, Abstract manipulates your files to make sure it tracks every symbol/library link in your projects.

Because if this:
- Your override symbol links will also be handled by Abstract, so you'll see that once you import an instance of a symbol its override symbols will be disconnected from their source libraries.
- Detaching symbol instances that derive from symbol masters located in external sketch library files will destroy the connection between some of its symbol layers and their symbol masters.

This plugin was created to solve both of these problems by looking for the original symbol masters and relinking any symbols and overrides back to their original source.

## Installation

- [Download](../../releases/latest/download/abstract-fix.sketchplugin.zip) the latest release of the plugin
- Un-zip
- Double-click on abstract-fix.sketchplugin

## Options

### Fix Symbols

Select a layer and click Plugins > Abstract Fix > Fix Symbols
- Fixes the library links for all symbols found within the selected layer

### Fix and Detach Symbols

Select a layer and click Plugins > Abstract Fix > Fix and Detach Symbols
- Fixes the library links for all symbols found within the selected layer
- Detaches every symbol symbols found within the selected layer

## Changelog

- **1.0** - Initial release.

## License

The MIT License (MIT) Copyright (c) 2019 Goncalo Espinha

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
