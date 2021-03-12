
var yes = function(y)
{
	return y.value;
}


//Data reading from csv
d3.csv("labour.csv",function(d)
{
	return{
		country: d.Country,
		year : +d.Year,
		unemployment : +d['Rate of Unemployment as % of Labour Force'],
	};
	
}).then(function(data,error)

{
    
	var select_year = document.getElementById("year");
	select_year.addEventListener("change",function(){
		var year = yes(this);
		country = d3.select("#country").property("value");
		console.log(year);
		console.log(country);
	
		var data2 = data_filter2(data,year,country);
		console.log(data2);
		draw_chart_filtered2(data2,year,country);
	});
	
	var select_country = document.getElementById("country");
	select_country.addEventListener("change",function(){
		var country = yes(this);
		year = d3.select("#year").property("value");
		console.log(country);
		console.log(year);
		var data3 = data_filter2(data,year,country);
		console.log(data3);
		draw_chart_filtered2(data3,year,country);
     });
	
	var data1 = change_data2(data);
	draw_chart2(data1);
});

var data_filter2 = function(data,years,countries)
{
	
	data_filtered = [];
	
	if((years == "All" )&& (countries == "All"))
	{
		var data_filtered = change_data2(data);
		return data_filtered;
	}
	if((years == "All") && (countries != "All"))
	{
		var data_filtered =[];
		for(var x = 0; x < data.length;x++)
		{
			if(data[x].country == countries)
			{
				console.log(data[x].year);
				data_filtered.push({"key" :data[x].year,"value" : data[x].unemployment});
			}
		}
		
		return data_filtered;
	}
	if((years != "All" )&& (countries == "All"))
	{
		data1 = []
		for(var x = 0; x < data.length;x++)
		{
			if(data[x].year == years)
			{
				data1.push([data[x].unemployment]);
			}
		}
		
		var avg_data = d3.mean(data1);
		var data_filtered =[];
		data_filtered.push({"key" :years,"value" : avg_data});
		return data_filtered;
		
	}
	
	if((years != "All" )&& (countries != "All"))
	{
		var data_filtered =[];
		for(var x = 0; x < data.length;x++)
		{
			if((data[x].year == years) && (data[x].country == countries))
			{
				data_filtered.push({"key" :data[x].year,"value" : data[x].unemployment});
			}
		}
		return data_filtered;
	}
	
}
var change_data2 = function(data)
{
	
	var avg_unemployment = d3.nest()
					.key(function(d) { return d.year; })
					.rollup(function(v) { return d3.mean(v, function(d) { return d.unemployment; }); })
					.entries(data);
		return avg_unemployment;
		
}
var draw_chart_filtered2 = function(data,year,countries)
{
	
	var svg = d3.select("#svg4");
    svg.selectAll("*").remove();
	//creating margin
	var margin = {top:20,right:20,bottom:30,left:50},
	    width = 600 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;
	
	data2 = [];
	
	for(var x = 0; x < data.length; x++)
	{
		key = (new Date(+data[x].key,0,1));
		data2.push({"key" :key,"value" : data[x].value});
		
	}
	
	
	//scaling for xAxis		
	var xScale = d3.scaleTime()
		  .domain([d3.min(data2,function(d){ return d.key;}),d3.max(data2,function(d){ return d.key;})])
		  .range([0, 400]);
  //scaling for yAxis
	var yScale = d3.scaleLinear()
			.domain(d3.extent(data2,function(d){ return d.value;}))
			.range([height/2,0])
			.nice();
	//xAxis according to xScale			
	var xAxis = d3.axisBottom()
				.scale(xScale)
				.tickValues(xScale.ticks(5).concat(xScale.domain()[0]));
				
	//yAxis according to yScale
	var yAxis = d3.axisLeft()
				.scale(yScale)
				.ticks(10);
	
	
	//seleting the svg 			
	var canvas = d3.select("#svg4")
				.attr("height",height+margin.top+margin.bottom)
				.attr("width",width + margin.left +margin.right)
				.append("g")
				.attr("transform","translate(100,100)")
				
	
	//creating the chart
	var linechart = canvas.append("path")
		  .datum(data2)
		  .attr("fill", "none")
		  .attr("stroke", "steelblue")
		  .attr("stroke-width", "2px")
		  .attr("class","line")
		  .attr("d", d3.line()
		  .x(function(d){return xScale(d.key);})
		  .y(function(d){return yScale(d.value);})
		  );
	
	
		
	//calling xAxis			
	canvas.append("g")
		.call(xAxis)
		.attr("transform","translate(0,"+height/1.9+")");
	//calling yAxis	
	canvas.append("g")
		.call(yAxis);
	
	//labelling xAxis	
	canvas.append("g")
	.append("text")
    .attr("class", "xlabel")
    .attr("text-anchor", "end")
	.attr("font-family", "Times New Roman")
	.attr("font-size" ,"16px")
	.attr("font-weight","bold")
    .text("Year")
	.attr("transform","translate(215,240)");
	
	//labelling yAxis
	canvas.append("g")
	.append("text")
    .attr("class", "ylabel")
    .attr("text-anchor", "end")
	.attr("font-family", "Times New Roman")
	.attr("font-size" ,"16px")
    .attr("y", -55)
	.attr("x", - 25)
	.attr("font-weight","bold")
    .text("Unemployment(%)")
	.attr("transform","rotate(-90)");
	
	//labelling title of graph
	canvas.append("g")
		.append("text")
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
		.attr("font-weight","bold")
        .text("Rate of Unemployment(%) by Year")
		.attr("transform","translate(200,-60)");
	
	
	   canvas.selectAll("circle")	
        .data(data2)			
		.enter()
		.append("circle")								
        .attr("r", 4)		
        .attr("cx", function(d) { return xScale(d.key); })		 
        .attr("cy", function(d) { return yScale(d.value); })
		.attr("fill","steelblue")
		.on("mouseover",function(d)
				{
					tooltip.style("display",null);
				})
				.on("mouseout",function(d)
				{
					tooltip.style("display","none");
				})
				.on("mousemove",function(d)
				{
					var xPos = d3.mouse(this)[0] -120;
					var yPos = d3.mouse(this)[1] - 40;
					tooltip.attr("transform","translate("+ xPos +","+yPos+")");
					tooltip.select("rect")
							.attr("fill","white")
							.attr("stroke","green")
							.attr("stroke-width","2px")
					tooltip.select("text")
							.text(("Year : "+formatTime(d.key))+  ", Rate : "+d.value.toFixed(2)+"%");
			
			
				});
				
				
	var formatTime = d3.timeFormat("%Y");
	//adding tooltip
	var tooltip = canvas.append("g")
						.attr("class","tooltip")
						.style("display","none")
			tooltip.append("rect")
					.attr("height",30)
					.attr("width",170)
					.attr("x",50)
					.attr("y",-20);
			tooltip.append("text")
					.attr("x",55)
					.attr("y",0)
					.style("fill", "blue")
					.style("font-size","14px")
					.style("font-family", "Times New Roman")
					.attr("font-weight","bold");
}

//function for drawing 
var draw_chart2 = function(data)
{
	//creating margin
	var margin = {top:20,right:20,bottom:30,left:50},
	    width = 600 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;
	
	
	data2 = [];
	
	for(var x = 0; x < data.length; x++)
	{
		key = (new Date(+data[x].key,0,1));
		data2.push({"key" :key,"value" : data[x].value});
		
	}
	
	//scaling for xAxis		
	var xScale = d3.scaleTime()
		  .domain([d3.min(data2,function(d){ return d.key;}),d3.max(data2,function(d){ return d.key;})])
		  .range([0, 400]);
  //scaling for yAxis
	var yScale = d3.scaleLinear()
			.domain(d3.extent(data2,function(d){ return d.value;}))
			.range([height/2,0])
			.nice();
	//xAxis according to xScale			
	var xAxis = d3.axisBottom()
				.scale(xScale)
				.tickValues(xScale.ticks(5).concat(xScale.domain()[0]));
				
	//yAxis according to yScale
	var yAxis = d3.axisLeft()
				.scale(yScale)
				.ticks(10);
	
	
	//seleting the svg 			
	var canvas = d3.select("#svg4")
				.attr("height",height+margin.top+margin.bottom)
				.attr("width",width + margin.left +margin.right)
				.append("g")
				.attr("transform","translate(100,100)")
				
	
	//creating the chart
	var linechart = canvas.append("path")
		  .datum(data2)
		  .attr("fill", "none")
		  .attr("stroke", "steelblue")
		  .attr("stroke-width", "2px")
		  .attr("class","line")
		  .attr("d", d3.line()
		  .x(function(d){return xScale(d.key);})
		  .y(function(d){return yScale(d.value);})
		  );
	
	
		
	//calling xAxis			
	canvas.append("g")
		.call(xAxis)
		.attr("transform","translate(0,"+height/1.9+")");
	//calling yAxis	
	canvas.append("g")
		.call(yAxis);
	
	//labelling xAxis	
	canvas.append("g")
	.append("text")
    .attr("class", "xlabel")
    .attr("text-anchor", "end")
	.attr("font-family", "Times New Roman")
	.attr("font-size" ,"16px")
	.attr("font-weight","bold")
    .text("Year")
	.attr("transform","translate(215,240)");
	
	//labelling yAxis
	canvas.append("g")
	.append("text")
    .attr("class", "ylabel")
    .attr("text-anchor", "end")
	.attr("font-family", "Times New Roman")
	.attr("font-size" ,"16px")
    .attr("y", -55)
	.attr("x", - 25)
	.attr("font-weight","bold")
    .text("Unemployment(%)")
	.attr("transform","rotate(-90)");
	
	//labelling title of graph
	canvas.append("g")
		.append("text")
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
		.attr("font-weight","bold")
        .text("Rate of Unemployment(%) by Year")
		.attr("transform","translate(200,-60)");
	
	
	   canvas.selectAll("circle")	
        .data(data2)			
		.enter()
		.append("circle")								
        .attr("r", 4)		
        .attr("cx", function(d) { return xScale(d.key); })		 
        .attr("cy", function(d) { return yScale(d.value); })
		.attr("fill","steelblue")
		.on("mouseover",function(d)
				{
					tooltip.style("display",null);
				})
				.on("mouseout",function(d)
				{
					tooltip.style("display","none");
				})
				.on("mousemove",function(d)
				{
					var xPos = d3.mouse(this)[0] -120;
					var yPos = d3.mouse(this)[1] - 40;
					tooltip.attr("transform","translate("+ xPos +","+yPos+")");
					tooltip.select("rect")
							.attr("fill","white")
							.attr("stroke","green")
							.attr("stroke-width","2px")
					tooltip.select("text")
							.text(("Year : "+formatTime(d.key))+  ", Rate : "+d.value.toFixed(2)+"%");
			
			
				});
				
				
	var formatTime = d3.timeFormat("%Y");
	//adding tooltip
	var tooltip = canvas.append("g")
						.attr("class","tooltip")
						.style("display","none")
			tooltip.append("rect")
					.attr("height",30)
					.attr("width",170)
					.attr("x",50)
					.attr("y",-20);
			tooltip.append("text")
					.attr("x",55)
					.attr("y",0)
					.style("fill", "blue")
					.style("font-size","14px")
					.style("font-family", "Times New Roman")
					.attr("font-weight","bold");
}