/* 	Formatierung wissenschaftlicher Publikationen mit HTML und CSS, Formatierungsskript
    Copyright (C) 2009 Daniel Bertram (daniel.bertram@stud.ifi.lmu.de)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

	Credits:
	
   	This program uses functions of Javascript BibTex Parser v0.1 (BibTex-0.1.2.js).
   	Javascript BibTex Parser v0.1 is free software distributed under the 
   	GNU General Public License.
    More info at: http://sourceforge.net/projects/jsbibtex/  
   	BibTex-0.1.2.js is copyright 2008 Steve Hannah. 
   	*/
 /*
var paperLayout = {
    container : [],
	getDpi : function(){
		//Calculate the dpi of the screen
		var testDiv = document.createElement("div");
		document.body.appendChild(testDiv);
		testDiv.style.height = "1in";
		testDiv.style.width = "1in";
		var dpiString = document.defaultView.getComputedStyle(testDiv,null).height; 
		dpiString = dpiString.substring(0, (dpiString.length - 2));
		this.dpi = parseInt(dpiString, 10);
		document.body.removeChild(testDiv);
	},
	getFirstMultiColumnElement : function(){
		var elements;
		var element;
		switch(this.type){
			case "sigchi": 	elements = document.getElementsByClassName('abstract');
							element = elements[0];
				break;
			case "infovis": if(document.getElementsByClassName('diamondRule')[0]){
								elements = document.getElementsByClassName('diamondRule');
								element = elements[0].nextElementSibling;
								}
							else{
								elements = document.getElementsByClassName('keywords');
								element = elements[1].nextElementSibling;
							}
				break;
			case "lncs": 	elements = document.getElementsByClassName('keywords');
							element = elements[1].nextElementSibling;
				break;
			case "chiextended": elements = document.getElementsByClassName('author');
								element = elements[0];
				break;									
		}	
		return element;
	},
	getElementHeight: function(node){
		//returns the height of an element, including top and bottom margin. Unit is pixel.
		var elementHeight = 0;
		var heightString = document.defaultView.getComputedStyle(node,null).height;
		heightString = heightString.substring(0, (heightString.length - 2));
		var height = parseInt(heightString, 10);
		elementHeight += height;	
		var marginTopString = document.defaultView.getComputedStyle(node,null).marginTop;
		marginTopString = marginTopString.substring(0, (marginTopString.length - 2));		
		var marginTop = parseInt(marginTopString, 10);
		if (marginTopString !== "au"){
			elementHeight += marginTop;
		}
		var marginBottomString = document.defaultView.getComputedStyle(node,null).marginBottom;
		marginBottomString = marginBottomString.substring(0, (marginBottomString.length - 2));
		var marginBottom = parseInt(marginBottomString, 10);
		if (marginBottomString !== "au"){
			elementHeight += marginBottom;
		}	
		return elementHeight;	
		},	
	getElementTop: function(node){
		//returns the distance between the top margin of the element and the top margin of the parent element. Unit is pixel.
		var topString = document.defaultView.getComputedStyle(node, null).top;
		topString = topString.substring(0, (topString.length - 2));
		var elementTop = parseInt(topString, 10);
		return elementTop;						
		},	
	getElementBottom: function(node){
		//returns the distance between the top margin of the element and the top margin of the parent element. Unit is pixel.
		var bottomString = document.defaultView.getComputedStyle(node, null).bottom;
		bottomString = bottomString.substring(0, (bottomString.length - 2));
		var elementBottom = parseInt(bottomString, 10);
		return elementBottom;						
		},	
	getCopyrightBoxHeight: function(columnWidthPX){			
		//returns the height of the copyright box.
		var node = document.getElementById("copyrightBox");
		document.body.appendChild(node);		
		node.style.width = columnWidthPX;		
		var heightString = document.defaultView.getComputedStyle(node,null).height;
		heightString = heightString.substring(0, (heightString.length - 2));
		var height = parseInt(heightString, 10);
		return height;	
	},	
    initialize : function(){
		this.getDpi();
		//Get the name of the used stylesheet:
        var url = document.styleSheets[0].href;
        var styleSheetName = "styleSheet";
        var styleSheetNames = [/sigchi.css$/, /chiextended.css$/, /lncs.css$/, /infovis.css$/];
        for (var i = 0; i < 4; i++) {           
            if (styleSheetNames[i].exec(url)) {
                styleSheetName = styleSheetNames[i].exec(url).toString();
                styleSheetName = styleSheetName.substring(0, (styleSheetName.length - 4));               
            }
        }
        this.type = styleSheetName;
		switch(this.type){
			case "sigchi":		this.pageWidth = 17.78;
	            				this.pageHeight = 23.495;
	            				this.columnCount = 2;			
	            				this.columnGap = 0.8382;
								this.columnWidth = 8.382;								
								if(this.medium ==="screen"){
									this.columnCount = 1;
									this.columnGap = 0;
									this.columnWidth = this.pageWidth;
								}
								this.columnGapPX = Math.round(this.columnGap / (2.54 / this.dpi));
								this.columnWidthPX = Math.round(this.columnWidth / (2.54 / this.dpi));
								this.copyrightBoxHeight = this.getCopyrightBoxHeight(this.columnWidthPX);
								this.columnHeight = this.pageHeight;
								this.columnHeightPX = Math.round(this.columnHeight / (2.54 / this.dpi));		
		
				break;
			case "chiextended": this.pageWidth = 23.495;
					            this.pageHeight = 17.78;
					            this.columnCount = 2;			
					            this.columnGap = 0.8382;
								this.columnWidth = 8.382;
								if(this.medium ==="screen"){
									this.columnCount = 1;
									this.columnGap = 0;
									this.columnWidth = this.pageWidth;
								}
								this.fullImgPage = 5;
								this.columnGapPX = Math.round(this.columnGap / (2.54 / this.dpi));
								this.columnWidthPX = Math.round(this.columnWidth / (2.54 / this.dpi));
								this.copyrightBoxHeight = this.getCopyrightBoxHeight(this.columnWidthPX);
								this.columnHeight = this.pageHeight;
								this.columnHeightPX = Math.round(this.columnHeight / (2.54 / this.dpi));
				break;
			case "lncs": 	this.pageWidth = 12.2;			
					            this.pageHeight = 19.3;
								this.columnCount = 1;
								this.columnGap = 0;	
								this.columnWidth = this.pageWidth;
								this.copyrightBoxHeight = 0;
								this.columnGapPX = Math.round(this.columnGap / (2.54 / this.dpi));			           
								this.columnWidthPX = Math.round(this.columnWidth / (2.54 / this.dpi));
								this.columnHeight = this.pageHeight; 
								this.columnHeightPX = Math.round(this.columnHeight / (2.54 / this.dpi));
				break;
			case "infovis":		this.pageWidth = 18.1102;			
					            this.pageHeight = 24.4475;
								this.columnCount = 2;
								this.columnGap = 0.4191;	
								this.columnWidth = 8.8392;
								if(this.medium ==="screen"){
									this.columnCount = 1;
									this.columnGap = 0;
									this.columnWidth = this.pageWidth;
								}		
								this.tableBorder = 1;
								this.columnGapPX = Math.round(this.columnGap / (2.54 / this.dpi));
								this.tableBorderPX = Math.round(this.tableBorder / (2.54 / this.dpi));	           
								this.columnWidthPX = Math.round(this.columnWidth / (2.54 / this.dpi));
								this.copyrightBoxHeight = this.getCopyrightBoxHeight(this.columnWidthPX);
								this.columnHeight = this.pageHeight;
								this.columnHeightPX = Math.round(this.columnHeight / (2.54 / this.dpi)); 								 
				break;				
			}
		//insert infovis diamond rule
		if (this.type === "infovis"){
			var tempContent = document.createElement("div");
			tempContent.className = "diamondRule";
			var tempFig = document.createElement("img");
			tempFig.alt = "Sample illustration";
			tempFig.src = "./Pictures/diamondrule.png";
			tempContent.appendChild(tempFig);
			document.body.insertBefore(tempContent, document.getElementsByClassName('keywords')[1].nextElementSibling);				
		}	
		//Calculate FrontColumnHeight
		var firstMultiColumnElement = this.getFirstMultiColumnElement();
		var element = firstMultiColumnElement.previousElementSibling;		
		var predecessorHeightPX = 0;
		while (element) {
			if((this.getElementTop(element) !==  this.getElementTop(element.nextElementSibling)) || element.nextElementSibling === firstMultiColumnElement){	
				predecessorHeightPX += this.getElementHeight(element);
				}	
			element = element.previousElementSibling;			
			}				
		this.frontColumnHeightPX = this.columnHeightPX - predecessorHeightPX;				
		//Calculate the Height of one textline
		var testLine = document.createElement("p");
		document.body.appendChild(testLine);
		var newTextNode = document.createTextNode("Test");
		testLine.appendChild(newTextNode);		
		this.lineHeight = this.getElementHeight(testLine); 
		document.body.removeChild(testLine);
		},
	calculateRemainingSpace : function (mode) {
		//Returns the remaining space in the column
		var remainingSpace = 0;
		if (mode === "normal"){		
			if (this.currentContainer === 0 && this.type === "chiextended") {
				var childnumber = this.container[this.currentContainer].childElementCount;
				remainingSpace = this.frontColumnHeightPX - this.copyrightBoxHeight;
				if(childnumber === 8){
					remainingSpace = 0;
					}					
			}	
			else if (this.currentContainer === 0) {
				remainingSpace = this.frontColumnHeightPX - this.copyrightBoxHeight - this.getElementHeight(this.container[this.currentContainer]);	
			}				
			else if (this.currentContainer === 1 && this.type !== "lncs") {
				remainingSpace = this.frontColumnHeightPX - this.getElementHeight(this.container[this.currentContainer]);
			}
	        else {
				remainingSpace = this.columnHeightPX - this.getElementHeight(this.container[this.currentContainer]) -  Math.round(1/(2.54 / this.dpi));
			}	
		}
		else if (mode === "lastColumns"){
			remainingSpace = this.lastPageColumnHeight - this.getElementHeight(this.container[this.currentContainer]);
			}	
		return remainingSpace;
		},	
	createColumn : function () {
		//Creates a new column
		var newColumn = document.createElement("div");
		newColumn.className = "column";
		if(this.medium === "screen"){
			newColumn.style.clear= "both";
		}
		this.container.push(newColumn);
		this.container[this.container.length - 1].style.width = this.columnWidthPX +"px";
		document.body.appendChild(this.container[this.container.length - 1]);
		},
	getColumnHeight : function (){
			var columnHeight;
			switch (this.currentContainer){
				case 0: columnHeight = this.frontColumnHeightPX - this.copyrightBoxHeight;
					break;
				case 1: columnHeight = this.frontColumnHeightPX;
					break;
				default: this.columnHeightPX; 	
			}
			return columnHeight;
		},
	alignColumns : function () {		
		if (this.type !== "lncs") {
			for (var i = 0; i < this.container.length; i++) {
				if (i % 2 !== 0) {
					this.container[i].style.cssFloat = "right";					
				}
				if (i % 2 === 0) {
					if (i > 0) {
						this.container[i].style.clear = "both";
					}
					this.container[i].style.cssFloat = "left";
				}
			}
			if(this.type === "chiextended"){
				for (i = 0; i < this.container.length; i++) {
					if (i % 2 === 0) {
						var temp = document.createElement("div");
						temp.className = "columns";
						temp.style.cssFloat = "right";
						temp.style.width = this.columnWidthPX * 2 + this.columnGapPX;
						temp.appendChild(this.container[i]);
						if (i + 1 < this.container.length) {
							temp.appendChild(this.container[i + 1]);
						}
						document.body.appendChild(temp);
					}
				}
			}
		}			
		},
	createPageBreaks : function(){
		var element = document.body.firstElementChild;
		while(element){		
			if (element.className === "column") {
				var temp = document.createElement("div");
				temp.style.pageBreakAfter = "always";
				temp.appendChild(element.cloneNode("true"));
				if (this.type !== "lncs" && element.nextElementSibling && element.nextElementSibling.nodeName === "div") {
					temp.appendChild(element.nextElementSibling);
				}
				if (element.previousElementSibling.className === "column") {
					document.body.removeChild(element.previousElementSibling);
					document.body.insertBefore(temp, element);
				}
				else {
					document.body.insertBefore(temp, element);
				}
			}
			else if (element.className === "columns") {
				var temp = document.createElement("div");
				temp.style.pageBreakAfter = "always";				
				temp.appendChild(element.cloneNode("true"));
				if (element.previousElementSibling.className === "columns") {
					document.body.removeChild(element.previousElementSibling);
					document.body.insertBefore(temp, element);
					}
				else {
					document.body.insertBefore(temp, element);
					}
				}		
			element = element.nextElementSibling;				
		}
		document.body.removeChild(document.body.lastElementChild);
		document.body.lastElementChild.style.pageBreakAfter = "auto";	
		},
	nextColumn : function (mode){
		if(mode === "normal"){
			if (!this.container[this.currentContainer + 1]) {
				this.createColumn();
				}
			this.currentContainer++;			
		}
		else{
			if (this.currentContainer<this.container.length-1) {
				this.currentContainer++;
			}
		}
		},
	replaceCite : function (node){
		//replace all cite entries		
		var nodeChild;
		var nextNodeChild;
		var textnode;
		var link;
		var j;
		var figCounter = 0;
		var tabCounter = 0;
		var mathCounter = 0;
		var footCounter = 0;
		if (node.nodeName === "p"){			
			nodeChild = node.firstElementChild;
			while (nodeChild) {
				nextNodeChild = nodeChild.nextElementSibling;				
				if (nodeChild.nodeName === "cite") {																	
					for (j = 0; j < this.documentCitationList.length; j++){
						//literature
						if(nodeChild.firstChild.wholeText === this.documentCitationList[j]){							
							link = document.createElement("a");
							link.title = nodeChild.firstChild.wholeText;
							link.href = "#"+nodeChild.firstChild.wholeText;	
							link.id = "cite_ref"+nodeChild.firstChild.wholeText;
							textnode = document.createTextNode("[" + [j+1] + "]"); 
							link.appendChild(textnode);
							node.replaceChild(link, nodeChild);			
							}
						}
					//pictures	
					if(nodeChild.className === "figCite"){
						figCounter++;
						//Pictures, tables, math, footnote
						link = document.createElement("a");
						link.title = nodeChild.firstChild.wholeText;
						link.href = "#"+nodeChild.firstChild.wholeText;							
						textnode = document.createTextNode("Figure " + figCounter); 
						link.appendChild(textnode);
						node.replaceChild(link, nodeChild);										
						}
					//tables	
					if(nodeChild.className === "tabCite"){
						tabCounter++;
						//Pictures, tables, math, footnote
						link = document.createElement("a");
						link.title = nodeChild.firstChild.wholeText;
						link.href = "#"+nodeChild.firstChild.wholeText;							
						textnode = document.createTextNode("Table " + tabCounter); 
						link.appendChild(textnode);
						node.replaceChild(link, nodeChild);										
						}	
					//Math	
					if(nodeChild.className === "mathCite"){
						mathCounter++;
						//Pictures, tables, math, footnote
						link = document.createElement("a");
						link.title = nodeChild.firstChild.wholeText;
						link.href = "#"+nodeChild.firstChild.wholeText;							
						textnode = document.createTextNode("Formula " + mathCounter); 
						link.appendChild(textnode);
						node.replaceChild(link, nodeChild);										
						}	
					//footnote
					if(nodeChild.className === "footCite"){
						footCounter++;
						//Pictures, tables, math, footnote
						link = document.createElement("a");
						link.title = nodeChild.firstChild.wholeText;
						link.href = "#"+nodeChild.firstChild.wholeText;							
						textnode = document.createTextNode(footCounter);
						link.style.verticalAlign = "super"; 
						link.style.fontSize = "6pt";
						link.appendChild(textnode);
						node.replaceChild(link, nodeChild);										
						}											
					}				
				nodeChild = nextNodeChild;					
				}			
		}			
		else if (node.nodeName === "ol" || node.nodeName === "ul"){
			nodeChild = node.firstElementChild;
			while (nodeChild) {
				var grandChild = nodeChild.firstElementChild;
				while(grandChild){
					if (grandChild.nodeName === "cite") {
						for (j = 0; j < this.documentCitationList.length; j++){
							if(grandChild.firstChild.wholeText === this.documentCitationList[j]){
								link = document.createElement("a");
								link.title = grandChild.firstChild.wholeText;
								link.href = "#"+grandChild.firstChild.wholeText;
								link.id = "cite_ref"+grandChild.firstChild.wholeText;	
								textnode = document.createTextNode("[" + [j+1] + "]"); 
								link.appendChild(textnode);
								nodeChild.replaceChild(link, grandChild);								
							}
						}					
					}
					grandChild = grandChild.nextElementSibling;
				}	
				nodeChild = nodeChild.nextElementSibling;		
			}
		}
		},
	createHeadlineCounter : function(){
		//Create headline counter
		if (this.type === "lncs" || this.type === "infovis") {
			var element = document.body.firstElementChild;
			var newTextNode;
			var child;
			var h2Counter = 0;
			var h3Counter = 0;
			while (element) {
				child = element.firstElementChild;
				while (child) {
					if (child.nodeName === "h2") {
						h3Counter = 0;
						h2Counter++;
						newTextNode = document.createTextNode(h2Counter.toString() + "   ");
						child.insertBefore(newTextNode, child.firstChild);
					}
					if (child.nodeName === "h3") {
						h3Counter++;
						newTextNode = document.createTextNode(h2Counter.toString() + "." + h3Counter.toString() + "   ");
						child.insertBefore(newTextNode, child.firstChild);
					}
					child = child.nextElementSibling;
				}
				element = element.nextElementSibling;
			}
		}		
		},
	createListCounter: function(){
		//Create Ordered List counter
		var element = document.body.firstElementChild;
		var liCounter = 0;
		var newLi;
		var newTextNode;
		var counterStyleBefore;
		var counterStyleAfter;
		switch(this.type){
			case "sigchi": 	counterStyleBefore = "";
							counterStyleAfter = ". ";		
				break;
			case "chiextended": counterStyleBefore = "[";
								counterStyleAfter = "] ";
				break;
			case "lncs":	counterStyleBefore = "[";
							counterStyleAfter = "] ";
				break;
			case "infovis":	counterStyleBefore = "[";
							counterStyleAfter = "] ";									 
				break;
			}		
		while (element) {			
			if (this.medium === "print") {
				var child = element.firstElementChild;								
				while (child) {
					if (child.nodeName === "ol") {
						if (!(element.previousElementSibling.lastElementChild.nodeName === "ol" || (child.previousElementSibling && child.previousElementSibling.nodeName === "ol"))) {
							liCounter = 0;
						}
						var grandchild = child.firstElementChild;
						while (grandchild) {
							liCounter++;
							newLi = document.createElement("li");
							newTextNode = document.createTextNode(counterStyleBefore + liCounter.toString() + counterStyleAfter);
							newLi.appendChild(newTextNode);
							newLi.style.marginLeft = 0;
							newLi.style.cssFloat = "left";
							child.insertBefore(newLi, grandchild);
							grandchild = grandchild.nextElementSibling;
						}
					}
					child = child.nextElementSibling;
				}
			}
			else {
				if (element.nodeName === "ol") {
						if (!(element.previousElementSibling.nodeName === "ol")) {
							liCounter = 0;
						}
						var grandchild = element.firstElementChild;
						while (grandchild) {
							liCounter++;
							newLi = document.createElement("li");
							newTextNode = document.createTextNode(counterStyleBefore + liCounter.toString() + counterStyleAfter);
							newLi.appendChild(newTextNode);
							newLi.style.marginLeft = 0;
							newLi.style.cssFloat = "left";
							element.insertBefore(newLi, grandchild);
							grandchild = grandchild.nextElementSibling;
						}
					}
			}
			element = element.nextElementSibling;
			}		
		},
	alignImages: function(){
		//Align Images
		if(!(this.type === "lncs" || this.type === "chiextended")){
			var element = document.body.firstElementChild;
			while(element){
				var child = element.firstElementChild;
				while(child){
					if (child.nodeName === "img" && child !== element.firstElementChild){
						element.appendChild(child.nextElementSibling);
						element.insertBefore(child, element.lastElementChild);	
						child = child.nextElementSibling;
					}
					child = child.nextElementSibling;
				}
				element = element.nextElementSibling;
			}			
		}		
		},
	alignFootnotes : function(){
		//Align Footnotes
		var element = document.body.firstElementChild;
		while(element){
			var child = element.firstElementChild;
			var contentHeight = 0;
			if (this.medium === "print") {
				//get contentHeight
				while (child) {
					contentHeight += this.getElementHeight(child);
					child = child.nextElementSibling;
				}
				child = element.firstElementChild;
				//Align Footnote
				while (child) {
					if (child.className === "footnote" && child.previousElementSibling) {
						if (child.previousElementSibling.nodeName === "hr") {
							child.previousElementSibling.style.marginTop = this.ColumnHeightPX - contentHeight;
							element.appendChild(child.previousElementSibling);
						}
						element.appendChild(child);
					}
					child = child.nextElementSibling;
				}
				element = element.nextElementSibling;
			}else{
				if (element.className === "footnote") {
						document.body.lastElementChild.appendChild(element);
					}
				element = element.nextElementSibling;				
				}
			}		
		},			
	alignFullPageImg : function(img){
		//Align ChiExtended Full Page Image
		document.body.appendChild(img);
		var element = document.body.firstElementChild;		
		img.style.width = Math.round(this.pageWidth / (2.54 / this.dpi));
		var child = img.firstElementChild;
		while(child){
			if(child.className === "center"){
				child.style.width = document.defaultView.getComputedStyle(child.firstElementChild,null).width;
				var widthString = document.defaultView.getComputedStyle(child.previousElementSibling.previousElementSibling,null).width;
				widthString = widthString.substring(0, (widthString.length - 2));
				var width = parseInt(widthString, 10);
				child.style.marginLeft = width + (this.columnGapPX / 2) +"px";
				}
			child = child.nextElementSibling;
			}
		for(var i = 0; i < this.fullImgPage; i++){
			if(element.nextElementSibling){
				element = element.nextElementSibling;
				}
			}	
		var temp = document.getElementById("fullPageImg");		
		document.body.insertBefore(temp, element);							
		},
	fillColumns : function (element, mode) {
		var tempElement;
		var remainingSpace;
		while (element) {
			if(element.className === "column"){
				break;
				}
			remainingSpace = this.calculateRemainingSpace(mode);
			if (mode === "normal"){
				if (!(element.nodeName === "img" || element.nodeName === "math" ||  element.nodeName === "hr" || element.className === "author")) {
						element.style.width = this.columnWidthPX +"px";
					}
				if (element.nodeName === "table" && this.type === "infovis") {
					element.style.width = this.columnWidthPX-(this.tableBorderPX*2) +"px";
					}				
				}					
			if ((element.nodeName === "p" || element.nodeName === "code") && (remainingSpace < this.getElementHeight(element))) {												
				if (remainingSpace < (this.lineHeight * 2)) {				
					this.nextColumn(mode);
					tempElement = element.cloneNode(true);
					this.container[this.currentContainer].appendChild(tempElement);
					element = element.nextElementSibling;
				}
				else {
					tempElement = document.createElement(element.nodeName);
					tempElement.className = element.className;
					var testElement = document.createElement(element.nodeName);
					this.container[this.currentContainer].appendChild(tempElement);
					var newTextNode;
					var testNode;
					var contentElement = element.firstChild;
					while (contentElement) {
						//Element is not a text node
						if (contentElement.nodeName !== "#text") {
							//Enough space						
							if (remainingSpace >= (this.getElementHeight(tempElement) + this.getElementHeight(contentElement))) {
								tempElement.appendChild(contentElement.cloneNode(true));
							}
							//not enough space
							else {
								this.nextColumn(mode);
								remainingSpace = this.calculateRemainingSpace(mode);
								tempElement = document.createElement(element.nodeName);
								this.container[this.currentContainer].appendChild(tempElement);
								tempElement.appendChild(contentElement.cloneNode(true));
							}
						}
						//Element is a text node
						else {						
							var content = contentElement.wholeText.split(" ");
							for (var j = 0; j < content.length; j++) {
								remainingSpace = this.calculateRemainingSpace(mode);
								//Enough space
								if (remainingSpace >= this.getElementHeight(tempElement)) {
									newTextNode = document.createTextNode(content[j] + " ");
									tempElement.appendChild(newTextNode);
								}
								//not enough space
								else {																			
									var tempCounter = 1;
									tempElement.removeChild(newTextNode);
									//Take care of widows: 
									this.container[this.currentContainer].appendChild(testElement);
									var x = j - 1;
									if(x < 0){x++;}
									for (var k = x; k < content.length; k++) {
										testNode = document.createTextNode(content[k] + " ");
										testElement.appendChild(testNode);
									}			
									var sibling = contentElement.nextSibling;
									while (sibling) {
										testElement.appendChild(sibling.cloneNode(true));
										sibling = sibling.nextSibling;
									}
									var remainingElementHeight = this.getElementHeight(testElement);
									this.container[this.currentContainer].removeChild(testElement);
									if (remainingElementHeight < (this.lineHeight * 2)) {
										var l = this.getElementHeight(tempElement);
										while (l === this.getElementHeight(tempElement)) {
											tempElement.removeChild(tempElement.lastChild);
											tempCounter++;
										}
										//delete empty element
										if (tempElement.hasChildNodes() === false) {
											this.container[this.currentContainer].removeChild(tempElement);
										}
									}														
									this.nextColumn(mode);								
									remainingSpace = this.calculateRemainingSpace(mode);
									tempElement = document.createElement(element.nodeName);
									this.container[this.currentContainer].appendChild(tempElement);
									while (0 <= tempCounter) {
										x = j - tempCounter;
										while(x < 0){
											x++;
										}
										newTextNode = document.createTextNode(content[x] + " ");
										tempElement.appendChild(newTextNode);
										tempCounter--;
									}
									//if the previous headline is now an orphan, get it:
									if (this.container[this.currentContainer - 1].lastElementChild.nodeName === "h2" || this.container[this.currentContainer - 1].lastElementChild.nodeName === "h3" || this.container[this.currentContainer - 1].lastElementChild.nodeName === "h4" || this.container[this.currentContainer - 1].lastElementChild.nodeName === "h5" || this.container[this.currentContainer - 1].lastElementChild.nodeName === "h6") {
										this.container[this.currentContainer].insertBefore(this.container[this.currentContainer - 1].lastElementChild, tempElement);
									}
								}
							}
						}
						contentElement = contentElement.nextSibling;
					}
					element = element.nextElementSibling;
				}				
			}
			//List elements	
			else if ((element.nodeName === "ol" || element.nodeName === "ul")){
				//Column is full
				if (remainingSpace <= 0 ) {			
					this.nextColumn(mode);
					tempElement = element.cloneNode(true);
					this.container[this.currentContainer].appendChild(tempElement);
					element = element.nextElementSibling;
				}				
				//Not enough space
				else if(remainingSpace < this.getElementHeight(element)){
					tempElement = document.createElement(element.nodeName);
					this.container[this.currentContainer].appendChild(tempElement);				
					contentElement = element.firstElementChild;
					while(contentElement){	
						remainingSpace = this.calculateRemainingSpace(mode);
						//Enough space:
						if (remainingSpace >= this.getElementHeight(contentElement) || (mode === "lastColumns" && this.currentContainer === this.container.length-1)) {							
							tempElement.appendChild(contentElement.cloneNode(true));				
						}
						//Not enough space:
						else {
							if (tempElement.hasChildNodes() === false) {
								this.container[this.currentContainer].removeChild(tempElement);
							}
							this.nextColumn(mode);
							remainingSpace = this.calculateRemainingSpace(mode);
							tempElement = document.createElement(element.nodeName);
							this.container[this.currentContainer].appendChild(tempElement);
							tempElement.appendChild(contentElement.cloneNode(true));
						}
						contentElement = contentElement.nextElementSibling;
					}
					//if the previous headline is now an orphan, get it:
					if(this.container[this.currentContainer - 1].hasChildNodes()){
						if (this.container[this.currentContainer - 1] && this.container[this.currentContainer - 1].lastElementChild.nodeName === "h2" || this.container[this.currentContainer - 1].lastElementChild.nodeName === "h3" || this.container[this.currentContainer - 1].lastElementChild.nodeName === "h4" || this.container[this.currentContainer - 1].lastElementChild.nodeName === "h5" || this.container[this.currentContainer - 1].lastElementChild.nodeName === "h6") {
							this.container[this.currentContainer].insertBefore(this.container[this.currentContainer - 1].lastElementChild, tempElement);
							}
						}
				}
				//enough space:
				else{
					tempElement = element.cloneNode(true);
					this.container[this.currentContainer].appendChild(tempElement);					
				}
				element = element.nextElementSibling;				
			}					
			//if headline would become an orphan:
			else if ((element.nodeName === "h2" || element.nodeName === "h3" || element.nodeName === "h4" || element.nodeName === "h5" || element.nodeName === "h6") && (this.getElementHeight(element) + this.lineHeight) > remainingSpace) {
				this.nextColumn(mode);
				tempElement = element.cloneNode(true);
				this.container[this.currentContainer].appendChild(tempElement);
				element = element.nextElementSibling;
			}
			//Pictures, Math:
			else if( (element.nodeName === "img" || element.nodeName === "math")){
				var tempCaption;
				//If the Column is full:				
				if (this.getElementHeight(element) > remainingSpace) {
					this.nextColumn(mode);		
				}
				//don't move the element:
				if(this.type === "lncs" || this.type === "chiextended"){
					tempElement = element.cloneNode(true);
					tempCaption = element.nextElementSibling.cloneNode(true);	
	
						this.container[this.currentContainer].appendChild(tempElement);
						this.container[this.currentContainer].appendChild(tempCaption);
											
					element = element.nextElementSibling;
					element = element.nextElementSibling;
				}
				//if the first element of the column is not a Picture, Math Element
				else if(this.container[this.currentContainer].childElementCount === 0 || !(this.container[this.currentContainer].firstElementChild.nodeName === "img" || this.container[this.currentContainer].firstElementChild.nodeName === "table" || this.container[this.currentContainer].firstElementChild.nodeName === "math")){
					tempElement = element.cloneNode(true);
					tempCaption = element.nextElementSibling.cloneNode(true);	

						this.container[this.currentContainer].insertBefore(tempCaption, this.container[this.currentContainer].firstElementChild);			
						this.container[this.currentContainer].insertBefore(tempElement, this.container[this.currentContainer].firstElementChild);
					
					element = element.nextElementSibling;
					element = element.nextElementSibling;
				}	
				//if the last element of the column is not a Picture, Table, Math Element
				else if(this.container[this.currentContainer].childElementCount === 0 || !(this.container[this.currentContainer].lastElementChild.nodeName === "img" || this.container[this.currentContainer].lastElementChild.nodeName === "table" || this.container[this.currentContainer].lastElementChild.nodeName === "math")){
					tempElement = element.cloneNode(true);
					tempCaption = element.nextElementSibling.cloneNode(true);

						this.container[this.currentContainer].appendChild(tempElement);
						this.container[this.currentContainer].appendChild(tempCaption);	
					
					element = element.nextElementSibling;	
					element = element.nextElementSibling;
				}				
				else{
					tempCounter = 1;
					while (this.currentContainer < this.container.length) {							
						tempCounter++;						
						this.currentContainer++;
					}		
					this.nextColumn(mode);
					this.currentContainer--;	
					tempElement = element.cloneNode(true);
					tempCaption = element.nextElementSibling.cloneNode(true);

						this.container[this.currentContainer].appendChild(tempElement);
						this.container[this.currentContainer].appendChild(tempCaption);	
					
					element = element.nextElementSibling;
					element = element.nextElementSibling;
					this.currentContainer -= tempCounter;
				}				
				//Return to the previous column if there is enough space
				if(mode === "normal" && this.calculateRemainingSpace(this.currentContainer-1) >= (this.getElementHeight(element) + this.lineHeight) && !(this.type === "lncs" || this.type === "chiextended")){
					this.currentContainer--;
				}	
			}
			//Tables:
			else if (element.nodeName === "table") {
				//If the Column is full:				
				if (this.getElementHeight(element) > remainingSpace) {
					this.nextColumn(mode);
				}
				//don't move the element:
				if (this.type === "lncs" || this.type === "chiextended") {
					tempElement = element.cloneNode(true);
					if (this.type === "lncs") {
						this.container[this.currentContainer].appendChild(tempElement);
					}
					else {
						this.container[this.currentContainer].appendChild(tempElement);
					}
					element = element.nextElementSibling;
				}
				//if the first element of the column is not a Picture, Table, Math Element
				else 
					if (this.container[this.currentContainer].childElementCount === 0 || !(this.container[this.currentContainer].firstElementChild.nodeName === "img" || this.container[this.currentContainer].firstElementChild.nodeName === "table" || this.container[this.currentContainer].firstElementChild.nodeName === "math")) {
						tempElement = element.cloneNode(true);
						if (this.type === "infovis") {
							this.container[this.currentContainer].insertBefore(tempElement, this.container[this.currentContainer].firstElementChild);
						}
						else {
							this.container[this.currentContainer].insertBefore(tempElement, this.container[this.currentContainer].firstElementChild);
						}
						element = element.nextElementSibling;
					}
					//if the last element of the column is not a Picture, Table, Math Element
					else 
						if (this.container[this.currentContainer].childElementCount === 0 || !(this.container[this.currentContainer].lastElementChild.nodeName === "img" || this.container[this.currentContainer].lastElementChild.nodeName === "table" || this.container[this.currentContainer].lastElementChild.nodeName === "math")) {
							tempElement = element.cloneNode(true);
							if (this.type === "infovis") {
								this.container[this.currentContainer].appendChild(tempElement);
							}
							else {
								this.container[this.currentContainer].appendChild(tempElement);
							}
							element = element.nextElementSibling;
						}
						else {
							tempCounter = 1;
							while (this.currentContainer < this.container.length) {
								tempCounter++;
								this.currentContainer++;
							}
							this.nextColumn(mode);
							this.currentContainer--;
							tempElement = element.cloneNode(true);
							
							if (this.type === "infovis") {
								this.container[this.currentContainer].appendChild(tempElement);
							}
							else {
								this.container[this.currentContainer].appendChild(tempElement);
							}
							element = element.nextElementSibling;
							this.currentContainer -= tempCounter;
						} 
				//Return to the previous column if there is enough space
				if (mode === "normal" && this.calculateRemainingSpace(this.currentContainer - 1) >= (this.getElementHeight(element) + this.lineHeight) && !(this.type === "lncs" || this.type === "chiextended")) {
					this.currentContainer--;
				}
			}			
			//Footnotes:
			else 
				if (element.className === "footnote") {
					//If the Column is full:				
					if (this.getElementHeight(element) > remainingSpace) {
						this.nextColumn(mode);
					}
					//if the last element of the column is not a Footnote
					if (this.container[this.currentContainer].childElementCount === 0 || this.container[this.currentContainer].lastElementChild.className !== "footnote") {
						var tempHr = document.createElement("hr");
						if (this.type === "infovis") {
							tempHr.style.marginBottom = 0;
						}
						this.container[this.currentContainer].appendChild(tempHr);
					}
					tempElement = element.cloneNode(true);
					this.container[this.currentContainer].appendChild(tempElement);
					element = element.nextElementSibling;
				}
				//Copyright Box:
				else 
					if (element.className === "copyrightBox") {
						if (this.medium === "print") {
							tempElement = element.cloneNode(true);
							this.container[0].appendChild(tempElement);
							element = element.nextElementSibling;
						}
						else {
							element = element.nextElementSibling;
						}
					}
					else 
						if (remainingSpace <= 0) {
							this.nextColumn(mode);
							tempElement = element.cloneNode(true);
							this.container[this.currentContainer].appendChild(tempElement);
							element = element.nextElementSibling;
						}
						else {
							tempElement = element.cloneNode(true);
							this.container[this.currentContainer].appendChild(tempElement);
							element = element.nextElementSibling;
						}
		}			
		},
	parseBibtex :function(){
		this.documentCitationList = [];
		var bibtex = new BibTex();
		var tempListEntry;	
		var newTextNode;	
		var newLink;
		var tempDiv;		
		var tempElement = document.createElement("ol");
		bibtex.content = document.getElementById("bibTex").contentDocument.body.firstChild.wholeText;
		bibtex.parse();
 		for (var i in bibtex.data) {
			this.documentCitationList.push(bibtex.data[i]['cite']);
			tempListEntry = document.createElement("li");			
			if (this.medium === "screen") {
				newLink = document.createElement("a");
				newLink.href = "#cite_ref"+bibtex.data[i]['cite'];
				newTextNode = document.createTextNode("↑");
				newLink.appendChild(newTextNode);
				tempListEntry.appendChild(newLink);		
				}
			newTextNode = document.createTextNode("");	
			switch (bibtex.data[i].entryType) {
				case "article":
					for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
						newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '');
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					tempDiv = document.createElement("div");
					tempDiv.style.fontStyle = "italic";
					tempDiv.style.display = "inline";
					tempDiv.appendChild(document.createTextNode(bibtex.data[i]['journal'] + ". "));
					tempListEntry.appendChild(newTextNode);
					tempListEntry.appendChild(tempDiv);
					newTextNode = document.createTextNode("");
					if (bibtex.data[i]['year']) {
						newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					}					
					if (bibtex.data[i]['volume']) {
						newTextNode.appendData(bibtex.data[i]['volume'] + ", ");
					}
					if (bibtex.data[i]['number']) {
						newTextNode.appendData(bibtex.data[i]['number'] + ", ");
					}
					if (bibtex.data[i]['pages']) {
						newTextNode.appendData(bibtex.data[i]['pages'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}			
					tempListEntry.id = bibtex.data[i]['cite'];					
					tempElement.appendChild(tempListEntry);
					break;
				case "book":
					if (bibtex.data[i]['author']) {
						for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
							newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
						}
					}
					else {
						for (var j = 0; j < bibtex.data[i]['editor'].length; j++) {
							newTextNode.appendData(bibtex.data[i]['editor'][j]['last'] + " " + bibtex.data[i]['editor'][j]['first'] + ", ");
						}
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '');
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					newTextNode.appendData(bibtex.data[i]['publisher'] + ". ");
					if (bibtex.data[i]['volume']) {
						newTextNode.appendData(bibtex.data[i]['volume'] + ", ");
					}
					if (bibtex.data[i]['number']) {
						newTextNode.appendData(bibtex.data[i]['number'] + ", ");
					}
					if (bibtex.data[i]['series']) {
						newTextNode.appendData(bibtex.data[i]['series'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['edition']) {
						newTextNode.appendData(bibtex.data[i]['edition'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					newTextNode.appendData(bibtex.data[i]['year'] + ", ");
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "booklet":
					if (bibtex.data[i]['author']) {
						for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
							newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
						}
						newTextNode.replaceData(newTextNode.length - 2, 1, '');
					}
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					if (bibtex.data[i]['howpublished']) {
						newTextNode.appendData(bibtex.data[i]['howpublished'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					if (bibtex.data[i]['year']) {
						newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "conference":
					for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
						newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '');
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					tempDiv = document.createElement("div");
					tempDiv.style.fontStyle = "italic";
					tempDiv.style.display = "inline";
					tempDiv.appendChild(document.createTextNode(bibtex.data[i]['booktitle'] + ". "));
					tempListEntry.appendChild(newTextNode);
					tempListEntry.appendChild(tempDiv);
					newTextNode = document.createTextNode("");
					newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					if (bibtex.data[i]['editor']) {
						newTextNode.appendData(bibtex.data[i]['editor'] + ", ");
					}
					if (bibtex.data[i]['volume']) {
						newTextNode.appendData(bibtex.data[i]['volume'] + ", ");
					}
					if (bibtex.data[i]['number']) {
						newTextNode.appendData(bibtex.data[i]['number'] + ", ");
					}
					if (bibtex.data[i]['series']) {
						newTextNode.appendData(bibtex.data[i]['series'] + ", ");
					}
					if (bibtex.data[i]['pages']) {
						newTextNode.appendData(bibtex.data[i]['pages'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					if (bibtex.data[i]['organization']) {
						newTextNode.appendData(bibtex.data[i]['organization'] + ", ");
					}
					if (bibtex.data[i]['publisher']) {
						newTextNode.appendData(bibtex.data[i]['publisher'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "inbook":
					if (bibtex.data[i]['author']) {
						for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
							newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
						}
					}
					else {
						for (var j = 0; j < bibtex.data[i]['editor'].length; j++) {
							newTextNode.appendData(bibtex.data[i]['editor'][j]['last'] + " " + bibtex.data[i]['editor'][j]['first'] + ", ");
						}
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '');
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					if (bibtex.data[i]['chapter']) {
						newTextNode.appendData(bibtex.data[i]['chapter'] + ", ");
					}
					if (bibtex.data[i]['pages']) {
						newTextNode.appendData(bibtex.data[i]['pages'] + ", ");
					}
					newTextNode.appendData(bibtex.data[i]['publisher'] + ", ");
					newTextNode.appendData(+bibtex.data[i]['year'] + ", ");
					if (bibtex.data[i]['volume']) {
						newTextNode.appendData(bibtex.data[i]['volume'] + ", ");
					}
					if (bibtex.data[i]['number']) {
						newTextNode.appendData(bibtex.data[i]['number'] + ", ");
					}
					if (bibtex.data[i]['series']) {
						newTextNode.appendData(bibtex.data[i]['series'] + ", ");
					}
					if (bibtex.data[i]['type']) {
						newTextNode.appendData(bibtex.data[i]['type'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['edition']) {
						newTextNode.appendData(bibtex.data[i]['edition'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "incollection":
					for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
						newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '');
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					tempDiv = document.createElement("div");
					tempDiv.style.fontStyle = "italic";
					tempDiv.style.display = "inline";
					tempDiv.appendChild(document.createTextNode(bibtex.data[i]['booktitle'] + ". "));
					tempListEntry.appendChild(newTextNode);
					tempListEntry.appendChild(tempDiv);
					newTextNode = document.createTextNode("");
					newTextNode.appendData(bibtex.data[i]['publisher'] + ", ");
					newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					if (bibtex.data[i]['editor']) {
						newTextNode.appendData(bibtex.data[i]['editor'] + ", ");
					}
					if (bibtex.data[i]['volume']) {
						newTextNode.appendData(bibtex.data[i]['volume'] + ", ");
					}
					if (bibtex.data[i]['number']) {
						newTextNode.appendData(bibtex.data[i]['number'] + ", ");
					}
					if (bibtex.data[i]['series']) {
						newTextNode.appendData(bibtex.data[i]['series'] + ", ");
					}
					if (bibtex.data[i]['type']) {
						newTextNode.appendData(bibtex.data[i]['type'] + ", ");
					}
					if (bibtex.data[i]['chapter']) {
						newTextNode.appendData(bibtex.data[i]['chapter'] + ", ");
					}
					if (bibtex.data[i]['pages']) {
						newTextNode.appendData(bibtex.data[i]['pages'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['edition']) {
						newTextNode.appendData(bibtex.data[i]['edition'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "inproceedings":
					for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
						newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '');
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					tempDiv = document.createElement("div");
					tempDiv.style.fontStyle = "italic";
					tempDiv.style.display = "inline";
					tempDiv.appendChild(document.createTextNode(bibtex.data[i]['booktitle'] + ". "));
					tempListEntry.appendChild(newTextNode);
					tempListEntry.appendChild(tempDiv);
					newTextNode = document.createTextNode("");
					if (bibtex.data[i]['year']) {
						newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					}				
					if (bibtex.data[i]['editor']) {
						newTextNode.appendData(bibtex.data[i]['editor'] + ", ");
					}
					if (bibtex.data[i]['volume']) {
						newTextNode.appendData(bibtex.data[i]['volume'] + ", ");
					}
					if (bibtex.data[i]['number']) {
						newTextNode.appendData(bibtex.data[i]['number'] + ", ");
					}
					if (bibtex.data[i]['series']) {
						newTextNode.appendData(bibtex.data[i]['series'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					if (bibtex.data[i]['organization']) {
						newTextNode.appendData(bibtex.data[i]['organization'] + ", ");
					}
					if (bibtex.data[i]['publisher']) {
						newTextNode.appendData(bibtex.data[i]['publisher'] + ", ");
					}
					if (bibtex.data[i]['pages']) {
						newTextNode.appendData(bibtex.data[i]['pages'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "manual":
					if (bibtex.data[i]['author']) {
						for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
							newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
						}
						newTextNode.replaceData(newTextNode.length - 2, 1, '');
					}
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					if (bibtex.data[i]['organization']) {
						newTextNode.appendData(bibtex.data[i]['organization'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['edition']) {
						newTextNode.appendData(bibtex.data[i]['edition'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					if (bibtex.data[i]['year']) {
						newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "masterthesis":
					for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
						newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '');
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					newTextNode.appendData(bibtex.data[i]['school'] + ". ");
					newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					if (bibtex.data[i]['type']) {
						newTextNode.appendData(bibtex.data[i]['type'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "misc":
					if (bibtex.data[i]['author']) {
						for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
							newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
						}
						newTextNode.replaceData(newTextNode.length - 2, 1, '');
					}
					if (bibtex.data[i]['title']) {
						newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					}
					if (bibtex.data[i]['howpublished']) {
						newTextNode.appendData(bibtex.data[i]['howpublished'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					if (bibtex.data[i]['year']) {
						newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "phdthesis":
					for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
						newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '');
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					newTextNode.appendData(bibtex.data[i]['school'] + ". ");
					newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					if (bibtex.data[i]['type']) {
						newTextNode.appendData(bibtex.data[i]['type'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "proceedings":
					if (bibtex.data[i]['editor']) {
						for (var j = 0; j < bibtex.data[i]['editor'].length; j++) {
							newTextNode.appendData(bibtex.data[i]['editor'][j]['last'] + " " + bibtex.data[i]['editor'][j]['first'] + ", ");
						}
						newTextNode.replaceData(newTextNode.length - 2, 1, '');
					}
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					if (bibtex.data[i]['volume']) {
						newTextNode.appendData(bibtex.data[i]['volume'] + ", ");
					}
					if (bibtex.data[i]['number']) {
						newTextNode.appendData(bibtex.data[i]['number'] + ", ");
					}
					if (bibtex.data[i]['series']) {
						newTextNode.appendData(bibtex.data[i]['series'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					if (bibtex.data[i]['organization']) {
						newTextNode.appendData(bibtex.data[i]['organization'] + ", ");
					}
					if (bibtex.data[i]['publisher']) {
						newTextNode.appendData(bibtex.data[i]['publisher'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "techreport":
					for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
						newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '');
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					newTextNode.appendData(bibtex.data[i]['institution'] + ". ");
					newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					if (bibtex.data[i]['type']) {
						newTextNode.appendData(bibtex.data[i]['type'] + ", ");
					}
					if (bibtex.data[i]['number']) {
						newTextNode.appendData(bibtex.data[i]['number'] + ", ");
					}
					if (bibtex.data[i]['address']) {
						newTextNode.appendData(bibtex.data[i]['address'] + ", ");
					}
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				case "unpublished":
					for (var j = 0; j < bibtex.data[i]['author'].length; j++) {
						newTextNode.appendData(bibtex.data[i]['author'][j]['last'] + " " + bibtex.data[i]['author'][j]['first'] + ", ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '');
					newTextNode.appendData(bibtex.data[i]['title'] + ". ");
					if (bibtex.data[i]['month']) {
						newTextNode.appendData(bibtex.data[i]['month'] + ", ");
					}
					if (bibtex.data[i]['year']) {
						newTextNode.appendData("(" + bibtex.data[i]['year'] + "), ");
					}
					newTextNode.replaceData(newTextNode.length - 2, 1, '.');
					tempListEntry.appendChild(newTextNode);
					if (bibtex.data[i]['note']) {
						tempListEntry.appendChild(document.createElement("br"));
						newTextNode = document.createTextNode(bibtex.data[i]['note'] + ".");
						tempListEntry.appendChild(newTextNode);
					}
					if (bibtex.data[i]['url']) {
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = bibtex.data[i]['url'];
						newTextNode = document.createTextNode(bibtex.data[i]['url'] + ".");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}	
					else if(this.medium === "screen"){
						tempListEntry.appendChild(document.createElement("br"));
						newLink = document.createElement("a");
						newLink.href = "http://scholar.google.com/scholar?q=" +bibtex.data[i]['title'];
						newTextNode = document.createTextNode("Search Google Scholar.");
						newLink.appendChild(newTextNode);
						tempListEntry.appendChild(newLink);
					}
					tempListEntry.id = bibtex.data[i]['cite'];
					tempElement.appendChild(tempListEntry);
					break;
				}	
			}
		document.getElementById("bibTex").parentNode.insertBefore(tempElement, document.getElementById("references").nextSibling);
		document.getElementById("bibTex").parentNode.removeChild(document.getElementById("bibTex"));
		},
	createPaper : function (medium) {		
		var fullPageImg;
		this.medium = medium;
		this.currentContainer = 0;
		this.initialize();
		this.parseBibtex();
		this.createColumn();
		if(this.type === "chiextended" && this.medium === "print"){
			fullPageImg = document.getElementById("fullPageImg");
			document.body.removeChild(document.getElementById("fullPageImg"));
			}
		//replace cite entries:
		var element = document.body.firstElementChild;
		while(element){		
			this.replaceCite(element);	
			element = element.nextElementSibling;
		}
		if (this.medium === "print") {		
			element = this.getFirstMultiColumnElement();	
			var mode = "normal";	
			//Fill Columns		
			this.fillColumns(element, mode);
			//delete old content
			element = this.getFirstMultiColumnElement();
			while (element) {
				if (element.className === "column") {
					break;
					}
				element = element.nextElementSibling;
				document.body.removeChild(element.previousElementSibling);
				}
			//SigChi Columns of the last page should be of approximately equal length:
			if (this.type === "sigchi" || this.type === "chiextended") {
				if (this.container.length % 2 !== 0) {
					this.createColumn();
					}
				this.lastPageColumnHeight = (this.getElementHeight(this.container[this.container.length - 2]) + this.getElementHeight(this.container[this.container.length - 1])) / 2;
				//get the content of the last two columns:
				var tempContent = document.createElement("div");
				tempContent.style.width = this.columnWidthPX + "px";
				document.body.appendChild(tempContent);
				element = this.container[this.container.length - 2].firstElementChild;
				while (element) {
					tempContent.appendChild(element.cloneNode(true));
					element = element.nextElementSibling;
					}
				element = this.container[this.container.length - 1].firstElementChild;
				while (element) {
					tempContent.appendChild(element.cloneNode(true));
					element = element.nextElementSibling;
					}
				//remove everything from the last two columns:
				var y = 0;
				while (y < this.container[this.container.length - 2].childElementCount) {
					element = this.container[this.container.length - 2].firstElementChild;
					this.container[this.container.length - 2].removeChild(element);
					}
				while (y < this.container[this.container.length - 1].childElementCount) {
					element = this.container[this.container.length - 1].firstElementChild;
					this.container[this.container.length - 1].removeChild(element);
					}
				//refill the last two columns:
				element = tempContent.firstElementChild;
				this.currentContainer = this.container.length - 2;
				mode = "lastColumns";			
				this.fillColumns(element, mode);
				//if there is only one element in the last two columns, it should be on the left side:
				if (!this.getElementHeight(this.container[this.container.length - 2]) > 0) {
					this.container[this.container.length - 2].appendChild(this.container[this.container.length - 1].firstElementChild);
					}
				document.body.removeChild(tempContent);
				}
			}
		this.createHeadlineCounter();
		this.createListCounter();	
		this.alignFootnotes();
		if(this.medium === "print"){	
			this.alignImages();		
			this.alignColumns();			
			this.createPageBreaks();
			this.alignFullPageImg(fullPageImg);			
			}	
		else{
			document.body.removeChild(document.getElementById("copyrightBox"));
		}			
		}
	};
var run = function() {
	paperLayout.createPaper("print");
	//paperLayout.createPaper("screen");
	};
window.addEventListener("load", run, true);
*/

var paperLayout = {
	createDocument : function(){
		this.getTitle();
		this.getAbstract();
		this.getKeywords();
		this.getACMKeywords();
	},

	getTitle : function(){
		var title = document.getElementsByTagName('title')[0].text;
		document.getElementById('title-text').innerHTML = title;
	},

	getAbstract : function(){
		var metas = document.getElementsByTagName('meta'); 

		for (i = 0; i < metas.length; i++) { 
			if (metas[i].getAttribute('name') == 'abstract') {
				document.getElementById('abstract-text').innerHTML = metas[i].getAttribute('content');
			} 
		}
	},

	getKeywords : function() {
		var keywords = document.getElementsByTagName('meta');
		for (i = 0; i < keywords.length; i++) { 
			if (keywords[i].getAttribute('name') == 'keywords') {
				document.getElementById('keywords').innerHTML = keywords[i].getAttribute('content');
			} 
		}
	},

	getACMKeywords : function() {
		var acm = document.getElementsByTagName('meta');
		for (i = 0; i < acm.length; i++) { 
			if (acm[i].getAttribute('name') == 'acm-keywords') {
				document.getElementById('keywords').innerHTML = acm[i].getAttribute('content');
			} 
		}
	}
}



var run = function() {
	paperLayout.createDocument();
};
window.addEventListener("load", run, true);