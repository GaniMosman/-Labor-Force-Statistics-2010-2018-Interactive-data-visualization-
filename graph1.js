var yes4 = function(y)
{
	return y.value;
}




d3.csv("labour.csv",function(d)
{
	return{
		country: d.Country,
		year : +d.Year,
		employment_female : +d['Employment females as % of employment'],
		employment_male : +d['Employment males as % of employment'],
	};
	
}).then(function(data)
{
	
	var select_country = document.getElementById("country");
	select_country.addEventListener("change",function(){
		var countries = yes4(this);
		year = d3.select("#year").property("value");
		console.log(year);
		console.log(countries);
		data2 = data_filter4(data,countries,year);
		console.log(data2);
		draw_chart_filtered4(data2);
		
	});
	
	var select_year = document.getElementById("year");
	select_year.addEventListener("change",function(){
		var year = yes4(this);
		console.log(year);
		country = d3.select("#country").property("value");
		console.log(country);
		data1 = data_filter4(data,country,year);
	    console.log(data1);
		draw_chart_filtered4(data1);
		
	});
	
   var data1 = change_data4(data)
     console.log(data);
	 draw_chart4(data1);

});

var data_filter4 = function(data,countries,year)
{
	if((year == "All" )&& (countries == "All"))
	{
		var data_filtered = change_data4(data);
		return data_filtered;
	}
	if((year == "All") && (countries != "All"))
	{
		var data_filtered =[];
		data1 = [];
		data2 = [];
		for(var x = 0; x < data.length;x++)
		{
			if(data[x].country == countries)
			{
				data2.push([data[x].employment_male]);
				data1.push([data[x].employment_female]);
				
			}
		}
		var avg_data1 = d3.mean(data1);
		var avg_data2 = d3.mean(data2);
		
		console.log(avg_data1,avg_data2);
		
		data_filtered.push({"key" :"Male","value" : avg_data2});
		data_filtered.push({"key" :"Female","value" : avg_data1});
		return data_filtered;
	}
	
	if((year != "All" )&& (countries == "All"))
	{
		var data_filtered =[];
		data1 = [];
		data2 = [];
		for(var x = 0; x < data.length;x++)
		{
			if(data[x].year == year)
			{
				data1.push([data[x].employment_female]);
				data2.push([data[x].employment_male]);
				
			}
		}
		var avg_data1 = d3.mean(data1);
		var avg_data2 = d3.mean(data2);
		
		console.log(avg_data1,avg_data2);
		
		data_filtered.push({"key" :"Male","value" : avg_data2});
		data_filtered.push({"key" :"Female","value" : avg_data1});
		return data_filtered;
		
	}
	if((year != "All" )&& (countries != "All"))
	{
		var data_filtered =[];
		for(var x = 0; x < data.length;x++)
		{
			if((data[x].year == year) && (data[x].country == countries))
			{
				data_filtered.push({"key" :"Male","value" : data[x].employment_male});
				data_filtered.push({"key" :"Female","value" : data[x].employment_female});
				
			}
		}
		
		return data_filtered;
	}
	
	
	
	
}

var draw_chart_filtered4= function(data)
{
	var svg = d3.select("#svg1");
    svg.selectAll("*").remove();
	var margin = {top: 20, right: 20, bottom: 20, left: 20},
		width = 600 - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom,
		radius = width/4;


	var color = d3.scaleOrdinal()
		.range(["blue", "steelblue"]);


	var arc2 = d3.arc()
		.outerRadius(radius - 10)
		.innerRadius(radius - 70);


	var labelArc = d3.arc()
		.outerRadius(radius - 40)
		.innerRadius(radius - 40);


	var pie = d3.pie()
		.sort(null)
		.value(function(d) { return d.value; });




	var svg2 = d3.select("#svg1")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(300,240)");

    

    
  var g2 = svg2.selectAll(".arc2")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc2")
	  .attr("transform", "translate(0,60)")
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
							.text(d.data.key + " : "+d.value.toFixed(2)+"%");
				});
				
	//adding tooltip
	var tooltip = svg2.append("g")
						.attr("class","tooltip")
						.style("display","none")
			tooltip.append("rect")
					.attr("height",30)
					.attr("width",110)
					.attr("x",50)
					.attr("y",-20);
			tooltip.append("text")
					.attr("x",55)
					.attr("y",0)
					.style("fill", "blue")
					.style("font-size","14px")
					.style("font-family", "Times New Roman")
					.attr("font-weight","bold");
					
        svg2.append("g")
			.append("text")
			.attr("text-anchor", "middle")  
			.style("font-size", "20px") 
			.attr("font-weight","bold")
			.style("font-family", "Times New Roman")
			.text("Rate of Employment By Gender(%)")
			.attr("transform","translate(0,-200)");
 
  g2.append("path")
      .attr("d", arc2)
      .style("fill", function(d) { return color(d.data.key); })
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenDonut);
        

  g2.append("text")
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
	  .style("font-size","14px")
	  .style("font-family", "Times New Roman")
	  .attr("font-weight","bold")
	  .text(function(d) { return d.data.value.toFixed(2)+"%"; });
	  
	  
	  var colorLegend = d3.legendColor()
			.labelFormat(d3.format(".0f"))
			.scale(color)
			.shapePadding(5)
			.shapeWidth(50)
			.shapeHeight(20)
			.labelOffset(12);
			
			svg2.append("g")
			.attr("transform", "translate(90, -150)")
			.call(colorLegend);
    

	function tweenDonut(b) {
	  b.innerRadius = 0;
	  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
	  return function(t) { return arc2(i(t)); };
	}
	
	
}


var change_data4= function(data)
{
	employment_female = [];
	employment_male=[];
	self_employment_female =[];
	self_employment_male =[];
	unemployment_female =[];
	unemployment_male =[];

	sector=[];
	
	data.forEach(function(d){
		employment_female.push(d.employment_female);
		employment_male.push(d.employment_male);
		self_employment_female.push(d.self_employment_female);
		self_employment_male.push(d.self_employment_male);
		unemployment_female.push(d.unemployment_female);
		unemployment_male.push(d.unemployment_male);
	});
	
	
	total_employment_male = 0;
	for(var x = 0; x < employment_male.length; x++)
	{
		total_employment_male = total_employment_male + employment_male[x];
	}
	avg_employment_male = total_employment_male / employment_male.length;
	sector.push({"key" :"Male","value" : avg_employment_male});
	
	total_employment_female = 0;
	for(var x = 0; x < employment_female.length; x++)
	{
		total_employment_female = total_employment_female + employment_female[x];
	}
	avg_employment_female = total_employment_female / employment_female.length;
	sector.push({"key" :"Female","value" : avg_employment_female});
	
	return sector;
	
}

var draw_chart4 = function(data)
{

	var margin = {top: 20, right: 20, bottom: 20, left: 20},
		width = 600 - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom,
		radius = width/4;


	var color = d3.scaleOrdinal()
		.range(["blue", "steelblue"]);


	var arc2 = d3.arc()
		.outerRadius(radius - 10)
		.innerRadius(radius - 70);


	var labelArc = d3.arc()
		.outerRadius(radius - 40)
		.innerRadius(radius - 40);


	var pie = d3.pie()
		.sort(null)
		.value(function(d) { return d.value; });




	var svg2 = d3.select("#svg1")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(300,240)");

    

    
  var g2 = svg2.selectAll(".arc2")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc2")
	  .attr("transform", "translate(0,60)")
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
							.text(d.data.key + " : "+d.value.toFixed(2)+"%");
				});
				
	//adding tooltip
	var tooltip = svg2.append("g")
						.attr("class","tooltip")
						.style("display","none")
			tooltip.append("rect")
					.attr("height",30)
					.attr("width",110)
					.attr("x",50)
					.attr("y",-20);
			tooltip.append("text")
					.attr("x",55)
					.attr("y",0)
					.style("fill", "blue")
					.style("font-size","14px")
					.style("font-family", "Times New Roman")
					.attr("font-weight","bold");
					
        svg2.append("g")
			.append("text")
			.attr("text-anchor", "middle")  
			.style("font-size", "20px") 
			.attr("font-weight","bold")
			.style("font-family", "Times New Roman")
			.text("Rate of Employment By Gender(%)")
			.attr("transform","translate(0,-200)");
 
  g2.append("path")
      .attr("d", arc2)
      .style("fill", function(d) { return color(d.data.key); })
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenDonut);
        

  g2.append("text")
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
	  .style("font-size","14px")
	  .style("font-family", "Times New Roman")
	  .attr("font-weight","bold")
      .text(function(d) { return d.data.value.toFixed(2)+"%"; });
	  
	  
	  var colorLegend = d3.legendColor()
			.labelFormat(d3.format(".0f"))
			.scale(color)
			.shapePadding(5)
			.shapeWidth(50)
			.shapeHeight(20)
			.labelOffset(12);
			
			svg2.append("g")
			.attr("transform", "translate(90, -150)")
			.call(colorLegend);
    

	function tweenDonut(b) {
	  b.innerRadius = 0;
	  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
	  return function(t) { return arc2(i(t)); };
	}
}



