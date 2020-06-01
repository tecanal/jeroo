const table = document.getElementById("mosaic");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Tile {
    constructor(cellRef) {
        // set the cell propery of the object to the reference to HTML TableCell
        this.cell = cellRef;

        // defaults
        this._borderColor = "black";
        this._borderStyle = "solid";
        this._borderWidth = 1;
        this._color = "#eeeeee";
        this._gradient = "";
        this._text = "";
    }

    static setSize(size) {
        // change the size of table cells
        const sheet = new CSSStyleSheet();
        sheet.replaceSync("td { padding: " + size + "px }");

        // apply the stylesheet to the document
        if (document.adoptedStyleSheets)
            document.adoptedStyleSheets = document.adoptedStyleSheets.concat(sheet);
        else
            document.adoptedStyleSheets = [sheet];
    }

    static setRadius(radius) {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync("td { border-radius: " + radius + "%; }");

        // apply the stylesheet to the document
        if (document.adoptedStyleSheets)
            document.adoptedStyleSheets = document.adoptedStyleSheets.concat(sheet);
        else
            document.adoptedStyleSheets = [sheet];
    }

    get cellRef() {
        return this.cell;
    }

    get borderColor() {
        return this._borderColor;
    }
    
    set borderColor(color) {
        this._borderColor = color;

        this.cell.style.borderColor = color;
    }

    setBorderColor(color) {
        // without the underscore means its calling the setter
        this.borderColor = color;

        return this;
    }

    get borderStyle() {
        return this._borderStyle;
    }

    set borderStyle(borderStyle) {
        this._borderStyle = borderStyle;

        this.cell.style.borderStyle = borderStyle;
    }

    setBorderStyle(borderStyle) {
        // without the underscore means its calling the setter
        this.borderStyle = borderStyle;

        return this;
    }

    get borderWidth() {
        return this._borderWidth;
    }

    set borderWidth(width) {
        // if the width is a number, add px
        if (!isNaN(width))
            this._borderWidth = width + "px";
        // if is already in px form or is word aka not a number
        else
            this._borderWidth = width;

        this.cell.style.borderWidth = this._borderWidth;
    }

    setBorderWidth(width) {
        // without the underscore means its calling the setter
        this.borderWidth = width;

        return this;
    }

    get color() {
        // return Color.getComponents(this._color);
        return this._color;
    }

    set color(color) {
        // set color of Tile object
        this._color = color;

        // get rid of any gradient it has
        this.cell.style.backgroundImage = "";

        // set background color
        this.cell.style.backgroundColor = color;
    }

    setColor(color) {
        // without the underscore means its calling the setter
        this.color = color;

        return this;
    }

    get gradient() {
        return this._gradient;
    }

    set gradient(colors) {
        // get rid of any color it has
        this.color = "";
        
        this._gradient = colors;

        // set the pixel gradient
        this.cell.style.backgroundImage = '-webkit-linear-gradient(' + colors.join(", ") + ')';
    }

    set backgroundImage(url) {
        this._backgroundImage = url;

        this.cell.style.background = "url(" + url + ")";
        this.cell.style.backgroundSize = "cover";
    }

    get backgroundImage() {
        return this._backgroundImage;
    }

    set transform(transform) {
        this.cell.style.transform = transform;
    }

    setGradient(...colors) {
        this.gradient = colors;

        return this;
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;

        this.cell.innerText = text;
    }

    setText(text) {
        this.text = text;

        return this;
    }

    get onClick() {
        return this._onClick;
    }

    set onClick(func) {
        this._onClick = func;

        // set the DOM onclick property to the function
        this.cell.onclick = func;
    }

    setOnClick(func) {
        // without the underscore means its calling the setter
        this.onClick = func;

        return this;
    }

    get onMouseOver() {
        return this._onMouseOver;
    }

    set onMouseOver(func) {
        this._onMouseOver = func;

        // set DOM onmouseover property to the function
        this.cell.onmouseover = func;
    }

    setOnMouseOver(func) {
        this.onMouseOver = func;

        return this;
    }
}

/**
* The Mosaic class.
*/
class Mosaic {
    constructor(width, height) {
        // set the height and width
        this._height = height;
        this._width  = width;

        // clear any leftover table HTML
        table.innerHTML = "";

        // create grid without tiles
        this._tiles = [...Array(this._width)].map(x => Array(this._height));

        // create table with height and width parameters
        for (let y = 0; y < this._height; y++) {
            let tableRow = table.insertRow(y);

            for (let x = 0; x < this._width; x++)  {
                let tile = new Tile(tableRow.insertCell(x));

                this._tiles[x][this._height - 1 - y] = tile;
            }
        }
    };
                
    /**
    * Set the height of the Mosaic object.
    */
    set height(height) {
        // this._height = height;
    }

    /**
    * Get the width of the Mosaic object.
    */
    set width(width) {
        // this._width = width;
    }
                
    /**
    * Get the height of the Mosaic object.
    */
    get height() {
        return this._height;
    }

    /**
    * Get the width of the Mosaic object.
    */
    get width() {
        return this._width;
    }

    get tiles() {
        return this._tiles;
    }

    /**
    * Get the raw DOM element from the table in case the user wants to do something 
    * outside of the normal Mosaic API.
    */
    getTile(x, y) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            return this._tiles[x][y];
    }
                
    /**
    * Set the tile color at x, y.
    */
    setTileColor(x, y, color) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) 
            this.getTile(x, y).color = color;
    }

    /**
    * Get the tile color at x, y.
    */
    getTileColor(x, y) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            return this.getTile(x, y).color;
    }

    /*
    * Give the pixel a color gradient.
    */
    setTileGradient(x, y, ...colors) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            this.getTile(x, y).gradient = colors;
    }

    /*
    * Give the pixel a color gradient.
    */
    getTileGradient(x, y) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            return this.getTile(x, y).gradient;
    }

    /**
    * Set the background image of the Tile.
    * @param {Number} x 
    * @param {Number} y 
    * @param {String} url 
    */
    setTileBackgroundImage(x, y, url) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            this.getTile(x, y).backgroundImage = url;
    }

    /**
    * 
    * @param {Number} x 
    * @param {Number} y 
    * @returns {String} url
    */
    getTileBackgroundImage(x, y) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            return this.getTile(x, y).backgroundImage;
    }

    /**
    * Set the tile border color at x, y.
    */
    setTileBorderColor(x, y, color) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            this.getTile(x, y).borderColor = color;
    }

    /**
    * Get the tile border color at x, y.
    */
    getTileBorderColor(x, y) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) 
            return this.getTile(x, y).borderColor;
    }

    /**
    * Set the tile border width at x, y.
    */
    setTileBorderWidth(x, y, width) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) 
            this.getTile(x, y).borderWidth = width;
    }

    /**
    * Set the tile border color at x, y.
    */
    getTileBorderWidth(x, y) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) 
            return this.getTile(x, y).borderWidth;
    }

    /**
    * Set the tile border style at x, y.
    */
    setTileBorderStyle(x, y, style) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            this.getTile(x, y).borderStyle = style;
    }

    /**
    * Get the tile border style at x, y.
    */
    getBorderStyle(x, y) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            return this.getTile(x, y).borderStyle;
    }

    /**
    * Set tile border properties at x, y.
    */
    setTileBorder(x, y, color, width, style) {
        setTileBorderColor(x, y, color);
        setTileBorderWidth(x, y, width);
        setTileBorderStyle(x, y, style);
    }

    /**
    * Set tile inner text.
    */
    setTileText(x, y, text) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) 
            this.getTile(x, y).text = text;
    }

    /**
    * Get tile inner text.
    */
    getTileText(x, y) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            return this.getTile(x, y).text;
    }

    /**
    * Set the tile click function.
    */
    setTileOnClick(x, y, func) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) 
            this.getTile(x, y).onClick = func;
    }

    /**
    * Set the tile mouseover function.
    */
    setTileOnMouseOver(x, y, func) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            this.getTile(x, y).onMouseOver = func;
    }

    /**
    * A wrapper function to allow animation looping.
    */
    static loop(func, time) {
        this.loopId = setInterval(func, time);
    }

    static stopLoop() {
        clearInterval(this.loopId);

        this.loopId = 0;
    }

    /**
    * Clear the Mosaic's tile color values.
    */
    clear() {
        for (let x = 0; x < this._width; x++) {
            for (let y = 0; y < this._height; y++) {
                this.getTile(x, y).backgroundImage = "";
                this.getTile(x, y).transform = "";
                this.getTile(x, y).color = "#eeeeee";
            }
        }
    }
}