/*
    piword.js
   
   Copyright 2018 álex bueno <francisco.manuel.alexander@gmail.com>
   
   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
   MA 02110-1301, USA.
   * 
 * */
function convertByte(text){
    //convert text to byte
    let result=[];
    for (var i = 0; i < text.length; i++){  
        result.push(text.charCodeAt(i));
    }
    return result;
}
function sliceInt(int_text,precissionNumberField){
    //slice int_text in pairs of numbers, each number has a size equals to precissionNumberField
    let max_for=int_text.length-precissionNumberField+1;
    let x=[];
    let y=[];
    console.log ("len int_text",int_text.length);
    console.log ("max_for",max_for);
    for (let i=0;i<max_for;i=i+2*precissionNumberField){
        let slice_1=int_text.substring(i,i+precissionNumberField);
        let slice_2=int_text.substring(i+precissionNumberField,i+2*precissionNumberField);
        if (slice_1 !=""){
            x.push(parseInt(slice_1)*10**(-precissionNumberField));
        }else{
            x.push(0);
        }
        if (slice_2 !=""){
            y.push(parseInt(slice_2)*10**(-precissionNumberField));
        }else{
            y.push(0);
        }
        
        
    }
    return {"x":x,"y":y};
}
function countInside(coordinates){
    //count number coordinates inside of circle
    let count=0;
    for (let i=0;i<coordinates.x.length;i++){
        if (coordinates.x[i]**2+coordinates.y[i]**2<=1){
            count++;
        }
    }
    console.log("count" ,count);
    return count;
}
function calculatePI(count,total){
    //get an aproximation a pi 
    console.log ("total",total,"count",count);
    let pi=count/total*4;
    return pi;
}
function getPI(nameField,precissionNumberField){
    //get inputs an get aproximation of pi
    let text=document.getElementById(nameField).value;
    let precission_number=parseInt(document.getElementById(precissionNumberField).value);
    if (Math.round(precission_number)===precission_number && precission_number>1){
		console.log ("text",text);
		let b=convertByte(text);
		console.log("byte",b);
		let int_text=b.join("");
		console.log ("int_text",int_text);
		let coordinates=sliceInt(int_text,precission_number);
		console.log("coordinates",coordinates);
		let pi=calculatePI(countInside(coordinates),coordinates.x.length);
		if (coordinates.x.length>=1){
			console.log("pi",pi);
			putValues(countInside(coordinates),coordinates.x.length);
			barChart(pi,Math.PI);
			scatterChart (coordinates);
		}else{
			alert ("Necesitas generar más puntos, al menos 1, tienes "+coordinates.x.length +" puntos");
		}
	}else{
		alert ("Por favor, introduce sólo números enteros y positivos mayores que 1 en 'Número de decimales de los puntos'");
	}
}
function putValues(datos_dentro,datos_total){
	//put values in datas div
	//let datos_dentro_value=parseInt(document.getElementById('datos_dentro_value').innerHTML);
	document.getElementById('datos_dentro_value').innerHTML=datos_dentro;
	document.getElementById('datos_total_value').innerHTML=datos_total;
}
function scatterChart (coordinates){
    //drawn the points
    
    d3.select('#svg_plot_coordinates').remove();
    let data = [];
    for (let i=0;i<coordinates.x.length;i++){
        data.push([coordinates.x[i],coordinates.y[i]]);
    }
   
    let margin = {top: 20, right: 20, bottom: 60, left: 60}
      , width = 400 - margin.left - margin.right
      , height = 400 - margin.top - margin.bottom;
    
    let x = d3.scale.linear()
              .domain([0, 1])
              .range([ 0, width ]);
    
    let y = d3.scale.linear()
    	      .domain([0, 1])
    	      .range([ height, 0 ]);
 
    let chart = d3.select('#plot_coordinates')
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
    .attr('id', 'svg_plot_coordinates')
	.attr('class', 'chart')

    let main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')   
        
    // draw the x axis
    
    let xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');
    let arc = d3.svg.arc()
        .innerRadius(width)
        .outerRadius(width);
    main.append("path")
          .attr('transform', 'translate(0,' + height + ')')
          .attr("fill", "none")
          .attr("stroke-width", 3)
          .attr("stroke", "blue")
          .attr("d", arc({startAngle:0, endAngle:(Math.PI/2)}))
    main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);
    main.append('line')
        .attr('x1',0)
        .attr('x2',width)
        .attr('y1',0)
        .attr('y2',0)
        .attr('stroke','red');
    main.append('line')
        .attr('x1',width)
        .attr('x2',width)
        .attr('y1',0)
        .attr('y2',height)
        .attr('stroke','red');
    // draw the y axis
    let yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

    main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

    let g = main.append("svg:g"); 
    
    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
          .transition()  // Gives the fly out from the center effect
              .delay(function (d, i){
                  return i * 100;  // Gives a slight delay with 100 ms spacing
              })
          .duration(100)
          .ease("elastic")
          .attr("cx", function (d,i) { return x(d[0]); } )
          .attr("cy", function (d) { return y(d[1]); } )
          .attr("r", 2);
     
}
function barChart(value_stimate,value_theorical){
    //plot to compare values of pi
        d3.select("#svg_plot_pi").remove();
        let data = [value_theorical,value_stimate];
        let colors=['green','blue'];
        let margin = {top: 20, right: 20, bottom: 60, left: 60}
          , width = 400 - margin.left - margin.right
          , height = 400 - margin.top - margin.bottom;
		let barPadding = 2;
		let barWidth = (width / data.length) - barPadding;

		let yScale = d3.scale.linear()
			.domain([0, d3.max(data)])
			.range([0, height]);

		let xScale = d3.scale.ordinal()
			.domain(data)
			.rangeBands([0, width], 0.1, 0.3);

		let svg = d3.select("#plot_pi")
            .append('svg:svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .attr('id', 'svg_plot_pi')
			.style('width', width + 'px')
			.style('height', height + 'px');

		svg.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr("x", function (d, i) {
				return xScale(d);
			})
			.attr("y", function (d, i) {
				return height;
			})
			.attr("width", function (d, i) {
				return xScale.rangeBand()
			})
			.attr("fill", function (d, i) {
				return colors[i]
			})
			.attr("height", 0)
			.transition()
			.duration(2000)
            .ease("elastic")
			.delay(function (d, i) {
				return i * 2000+500;
			})
			.attr("y", function (d, i) {	return height - yScale(d);
			})
			.attr("height", function (d, i) {
				return yScale(d);
			});
        svg.selectAll(".text")  		
            .data(data)
            .enter()
            .append("text")
            .attr("class","label")
            .attr("x", (function(d) { return xScale(d) +5; }  ))
            .attr("y", function (d, i) {return height - yScale(d)+20;})
            .attr("fill", "white")
            .style("font-size", function(d) {return xScale.rangeBand()/10+"px"  })
            .transition()
			.duration(2000)
            .ease("elastic")
			.delay(function (d, i) {
				return i * 2000+500;
                })
            .text(function(d) { return d; });
}

function smartContract(){
	//let web3 = new Web3();
	if (document.getElementById("adreess_contract").value!=="" && document.getElementById("adreess_contract").value!=="empty" ){
		  let web3 = window.web3;
			// Check if Web3 has been injected by the browser:
		  if (typeof web3 !== 'undefined') {
			// You have a web3 browser! Continue below!
			//let  provider = web3.currentProvider;
			//web3.eth.defaultAccount = web3.eth.accounts[0];
			//console.log(web3.eth.defaultAccount);
			
			let pi_contract = web3.eth.contract([
					{
						"constant": true,
						"inputs": [],
						"name": "pi",
						"outputs": [
							{
								"name": "",
								"type": "uint256"
							},
							{
								"name": "",
								"type": "uint256"
							}
						],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [
							{
								"name": "_newOwner",
								"type": "address"
							}
						],
						"name": "changeOwner",
						"outputs": [],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"constant": false,
						"inputs": [
							{
								"name": "_points_total",
								"type": "uint256"
							},
							{
								"name": "_inside",
								"type": "uint256"
							}
						],
						"name": "addPoint",
						"outputs": [],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					},
					{
						"inputs": [],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "constructor"
					}
				]);
			console.log(pi_contract);
			
			let pi_c = pi_contract.at(document.getElementById("adreess_contract").value);
			console.log(pi_c);
			document.getElementById("button_get_datas_smart_contract").style.display="block";
			document.getElementById("button_get_datas_smart_contract").addEventListener("click", function(){
				pi_c.pi(function(error, result){
						if(!error)
							{
								let pi=calculatePI(result[0],result[1]);
								console.log("pi",pi);
								putValues(result[0],result[1]);
								barChart(pi,Math.PI);
							}
						else{
							 
							console.error(error);
						}
					});
				
			});
			document.getElementById("button_add_datas_smart_contract").style.display="block";
			document.getElementById("button_add_datas_smart_contract").addEventListener("click", function(){
				let datos_dentro_value=parseInt(document.getElementById('datos_dentro_value').innerHTML);
				let datos_total_value=parseInt(document.getElementById('datos_total_value').innerHTML);
				try {
					pi_c.addPoint(datos_total_value,datos_dentro_value, {
											gas: 300000,
											from: web3.eth.accounts[0],
											value: web3.toWei(0, 'ether')
										 }, (err, result) => {
											 
											 if (!err){
												console.log(result);
											}else{
												console.log("error",err);
											}
										 });
				 }catch (e){
					 console.log(e);
					 alert('Por favor activa y logueate en el complemento de metamask y asegurate de tener ethers en tu cuenta  ');
												
				 }
				
				
			});
		  } else {
			 // Warn the user that they need to get a web3 browser
			 // Or install MetaMask, maybe with a nice graphic.
			 alert('Por favor activa y logueate en el complemento de metamask ');
		  }
	} else if (document.getElementById("adreess_contract").value=="empty") {
			 // Warn the user that they need to get a web3 browser
			 // Or install MetaMask, maybe with a nice graphic.
			 
			 alert('El contrato aún no está disponible en esta red');
	}
}
function animationText(text){
	//let split = new SplitText(text);
	console.log("text",text.childNodes);
	let new_divs=[];
	let nodes=text.childNodes;
	for (let n=0;n<nodes.length;n++){
		let textnode =nodes[n];
		console.log("n",n);
		console.log("text",text.childNodes);
		console.log("textnode",textnode);
		let text_comp=textnode.wholeText;
		console.log("textnode.nodeName",textnode.nodeName);
		if (textnode.nodeName!="DIV" && textnode.nodeName!="BR" && textnode.nodeName!="A"){
			let text_comp_array=text_comp.split();
			console.log("text_comp_array",text_comp_array);
			
			for (let i=0;i<text_comp.length;i++){
				let character=text_comp[i];
				let type_element="div";
				if (character==" "){
					character="\u00A0";
				}else if (character=="\n"){
					type_element="br";
				}
				//let replacementNode = textnode.splitText(1);

				// creating a span with ' span contents '
				let new_div = document.createElement(type_element);
				new_div.appendChild(document.createTextNode(character));

				// adding the span before 'bar'
				text.insertBefore(new_div, textnode);
				
				//let test=text.splitText(3);
				new_divs.push(new_div);
				
				
			}
			text.removeChild(textnode);
		}
	}
	function random(min, max){
			return (Math.random() * (max - min)) + min;
	}
	$(new_divs).each(function(i){
					TweenMax.from($(this), 2.5, {
						
						opacity: 0,
						x: random(-500, 500),
						y: random(-500, 500),
						z: random(-500, 500),
						scale: .1,
						delay: i * .02,
						yoyo: true,
						repeat: 0,
						repeatDelay: 0
						});
				});		

}

function changeText(div){
	document.getElementById('div_p1').style.display="none";
	document.getElementById('div_p2').style.display="none";
	document.getElementById('div_p3').style.display="none";
	document.getElementById('div_p4').style.display="none";
	document.getElementById('div_p5').style.display="none";
	document.getElementById('div_p6').style.display="none";
	document.getElementById('div_p7').style.display="none";
	document.getElementById('section_main').style.display="none";
	if (div!=='section_main'){
		document.getElementById(div).style.display="block";
		let p=div.split("_")[1];
		let text = document.getElementById(p);
		animationText(text);
	}else{
		document.getElementById('button_p1_back').style.display="none";
		document.getElementById('button_p2_back').style.display="none";
		document.getElementById('button_p3_back').style.display="none";
		document.getElementById('button_p4_back').style.display="none";
		document.getElementById('button_p5_back').style.display="none";
		document.getElementById('button_p6_back').style.display="none";
		document.getElementById('button_p7_back').style.display="none";
		
		document.getElementById('button_p1_next').style.display="none";
		document.getElementById('button_p2_next').style.display="none";
		document.getElementById('button_p3_next').style.display="none";
		document.getElementById('button_p4_next').style.display="none";
		document.getElementById('button_p5_next').style.display="none";
		document.getElementById('button_p6_next').style.display="none";
		document.getElementById('button_p7_next').style.display="none";
		
		document.getElementById('div_p1').style.display="block";
		document.getElementById('div_p2').style.display="block";
		document.getElementById('div_p3').style.display="block";
		document.getElementById('div_p4').style.display="block";
		document.getElementById('div_p5').style.display="block";
		document.getElementById('div_p6').style.display="block";
		document.getElementById('div_p7').style.display="block";
		document.getElementById('section_main').style.display="block";
	}
		
	
}

window.addEventListener('load', function() {
	
	smartContract();
	changeText('div_p1');

})


