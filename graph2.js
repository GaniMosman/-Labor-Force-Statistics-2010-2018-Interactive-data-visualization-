var yes3 = function(y)
{
	return y.value;
}

d3.csv("labour.csv",function(d)
{
	return{
		country : d.Country,
		year : d.Year,
		unemployment : +d['Rate of Unemployment as % of Labour Force'],
	};
	
}).then(function(data,error)
{
	var select_year = document.getElementById("year");
	select_year.addEventListener("change",function(){
		var year = yes3(this);
		country = d3.select("#country").property("value");
		console.log(year);
		console.log(country);
	
		var data2 = data_filter3(data,year,country);
		console.log(data2);
		draw_chart_filtered3(data2,year,country);
	});
	
	var select_country = document.getElementById("country");
	select_country.addEventListener("change",function(){
		var country = yes3(this);
		year = d3.select("#year").property("value");
		console.log(country);
		console.log(year);
		var data3 = data_filter3(data,year,country);
		console.log(data3);
		draw_chart_filtered3(data3,year,country);
     });
	data1 = change_data3(data);
	//console.log(data1);
	draw_chart3(data1);


});

var change_data3 = function(data)
{
	
	var avg_unemployment = d3.nest()
					.key(function(d) { return d.country; })
					.rollup(function(v) { return d3.mean(v, function(d) { return d.unemployment; }); })
					.entries(data);
		return avg_unemployment;
		
}

var data_filter3 = function(data,years,countries)
{
	
	data_filtered = [];
	
	if((years == "All" )&& (countries == "All"))
	{
		var data_filtered = change_data3(data);
		return data_filtered;
	}
	if((years == "All") && (countries != "All"))
	{
		data1 = []
		for(var x = 0; x < data.length;x++)
		{
			if(data[x].country == countries)
			{
				data1.push([data[x].unemployment]);
			}
		}
		
		var avg_data = d3.mean(data1);
		var data_filtered =[];
		data_filtered.push({"key" :countries,"value" : avg_data});
		return data_filtered;
		
	}
	if((years != "All" )&& (countries == "All"))
	{
		var data_filtered =[];
		for(var x = 0; x < data.length;x++)
		{
			if(data[x].year == years)
			{
				data_filtered.push({"key" :data[x].country,"value" : data[x].unemployment});
			}
		}
		
		return data_filtered;
	}
	
	if((years != "All" )&& (countries != "All"))
	{
		var data_filtered =[];
		for(var x = 0; x < data.length;x++)
		{
			if((data[x].year == years) && (data[x].country == countries))
			{
				data_filtered.push({"key" :data[x].country,"value" : data[x].unemployment});
			}
		}
		return data_filtered;
	}
}

var draw_chart_filtered3 = function(data,year,countries)
{
	var svg = d3.select("#svg2");
    svg.selectAll("*").remove();
	
	console.log(data.length);
	if(countries == "All")
	{
			var height = 400;
		var width = 580;
		
		var canvas = d3.select("#svg2")
					.attr("height",height + 100)
					.attr("width",width)
					.append("g")
					.attr("transform","translate(0,0)");
					
		var colorScale = d3.scaleLinear()
			.domain(d3.extent(data,function(d){ return d.value;}))
			.range(["green","red"]);
		
		var radiusScale = d3.scaleSqrt()
							.domain(d3.extent(data,function(d){ return d.value;}))
							.range([15,15]);
		var simulation = d3.forceSimulation()
						   .nodes(data);
						
			simulation
				.force("x",d3.forceX(width/2-20).strength(0.05))
				.force("y",d3.forceY(height/2+100).strength(0.05))
				.force("collide",d3.forceCollide(27));
				
			var bubbles = canvas.selectAll("circle")
								.data(data)
								.enter()
								.append("circle")
								.attr("class","nodes")
								.attr("r",function(d)
								{
									return radiusScale(d.value);
								})
								.attr("fill", function(d){
									
									return colorScale(d.value);
								})
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
											.text(d.key + " : "+d.value.toFixed(2)+"%");
								});
								
		 //color legend					
		 var colorLegend = d3.legendColor()
			.labelFormat(d3.format(".0f"))
			.scale(colorScale)
			.shapePadding(5)
			.shapeWidth(50)
			.shapeHeight(20)
			.labelOffset(12);
			
			canvas.append("g")
			.attr("transform", "translate(480, 150)")
			.call(colorLegend);
								
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
								
		
			simulation.on("tick", tickActions );
			
			function tickActions() {
					bubbles
					 .attr("cx", function(d) { return d.x; })
					 .attr("cy", function(d) { return d.y; })
				 }

		//labelling title of graph
		canvas.append("g")
			.append("text")
			.attr("text-anchor", "middle")  
			.style("font-size", "20px") 
			.attr("font-weight","bold")
			.style("font-family", "Times New Roman")
			.text("Rate of Unemployment By Country(%)")
			.attr("transform","translate(300,60)");
		
		canvas.append("g")
		.append("text")
		.attr("text-anchor", "middle")  
			.style("font-size", "14px") 
			.attr("font-weight","bold")
			.style("font-family", "Times New Roman")
			.attr("word-spacing",18)
			.text("Color Value")
			.attr("transform","translate(520,140)");
	
	}
	else
		{
			var height = 400;
			var width = 580;
		
			var canvas = d3.select("#svg2")
					.attr("height",height + 100)
					.attr("width",width)
					.append("g")
					.attr("transform","translate(0,0)");
					
		
		var radiusScale = d3.scaleSqrt()
							.domain(d3.extent(data,function(d){ return d.value;}))
							.range([40,40]);
		var simulation = d3.forceSimulation()
						   .nodes(data);
						
			simulation
				.force("x",d3.forceX(width/2-20).strength(0.05))
				.force("y",d3.forceY(height/2+100).strength(0.05))
				.force("collide",d3.forceCollide(27));
				
			var bubbles = canvas.selectAll("circle")
								.data(data)
								.enter()
								.append("circle")
								.attr("class","nodes")
								.attr("r",function(d)
								{
									return radiusScale(d.value);
								})
								.attr("fill", "blue")
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
											.text(d.key + " : "+d.value.toFixed(2)+"%");
								});
								
								
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
								
		
			simulation.on("tick", tickActions );
			
			function tickActions() {
					bubbles
					 .attr("cx", function(d) { return d.x; })
					 .attr("cy", function(d) { return d.y; })
				 }

		//labelling title of graph
		canvas.append("g")
			.append("text")
			.attr("text-anchor", "middle")  
			.style("font-size", "20px") 
			.attr("font-weight","bold")
			.style("font-family", "Times New Roman")
			.text("Rate of Unemployment By Country(%)")
			.attr("transform","translate(300,40)");
		
		}
	
	
	
}

var draw_chart3 = function(data)
{
	var height = 400;
	var width = 580;
	
	var canvas = d3.select("#svg2")
				.attr("height",height + 100)
				.attr("width",width)
				.append("g")
				.attr("transform","translate(0,0)");
				
	var colorScale = d3.scaleLinear()
        .domain(d3.extent(data,function(d){ return d.value;}))
        .range(["green","red"]);
	
	var radiusScale = d3.scaleSqrt()
						.domain(d3.extent(data,function(d){ return d.value;}))
						.range([15,15]);
	var simulation = d3.forceSimulation()
	                   .nodes(data);
					
	    simulation
			.force("x",d3.forceX(width/2-20).strength(0.05))
		    .force("y",d3.forceY(height/2+100).strength(0.05))
            .force("collide",d3.forceCollide(27));
			
		var bubbles = canvas.selectAll("circle")
							.data(data)
							.enter()
							.append("circle")
							.attr("class","nodes")
							.attr("r",function(d)
							{
								return radiusScale(d.value);
							})
							.attr("fill", function(d){
								
								return colorScale(d.value);
							})
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
										.text(d.key + " : "+d.value.toFixed(2)+"%");
							});
							
     //color legend					
	 var colorLegend = d3.legendColor()
        .labelFormat(d3.format(".0f"))
        .scale(colorScale)
        .shapePadding(5)
        .shapeWidth(50)
        .shapeHeight(20)
        .labelOffset(12);
		
		canvas.append("g")
        .attr("transform", "translate(480, 150)")
        .call(colorLegend);
							
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
							
	
		simulation.on("tick", tickActions );
		
		function tickActions() {
			    bubbles
				 .attr("cx", function(d) { return d.x; })
				 .attr("cy", function(d) { return d.y; })
			 }

	//labelling title of graph
	canvas.append("g")
		.append("text")
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
		.attr("font-weight","bold")
		.style("font-family", "Times New Roman")
        .text("Rate of Unemployment By Country(%)")
		.attr("transform","translate(300,40)");
	
	canvas.append("g")
	.append("text")
	.attr("text-anchor", "middle")  
        .style("font-size", "14px") 
		.attr("font-weight","bold")
		.style("font-family", "Times New Roman")
		.attr("word-spacing",18)
        .text("Color Value")
		.attr("transform","translate(520,140)");
	
	
}
