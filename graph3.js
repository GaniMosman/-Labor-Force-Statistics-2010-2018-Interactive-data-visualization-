var yes1 = function(y)
{
	return y.value;
}

//Data reading from csv
d3.csv("labour.csv",function(d)
{
	return{
		country :d.Country,
		year : d.Year,
		agriculture : +d['Employment in agriculture as % of employment'],
		industries : +d['Employment in industry as % of employment'],
		services : +d['Employment in services as % of employment'],
	};
	
}).then(function(data,error)
{
	var select_country = document.getElementById("country");
	select_country.addEventListener("change",function(){
		var countries = yes1(this);
		year = d3.select("#year").property("value");
		console.log(year);
		
		data2 = data_filter1(data,countries,year);
		draw_chart_filtered1(data2);
		
	});
	
	var select_year = document.getElementById("year");
	select_year.addEventListener("change",function(){
		var year = yes1(this);
		console.log(year);
		country = d3.select("#country").property("value");
		console.log(country);
		data1 = data_filter1(data,country,year);
		draw_chart_filtered1(data1);
		
	});
	
	data3 = change_data(data);
	draw_chart(data3);
});


var data_filter1 = function(data,countries,year)
{
	agri = [];
	service=[];
	industry =[];
	sector=[];
	
	
	console.log(data);
	
	
	
	if((year == "All" )&& (countries == "All"))
	{
			data.forEach(function(d){
			agri.push(d.agriculture);
			industry.push(d.industries);
			service.push(d.services);
			});
		total_agri = 0;
		for(var x = 0; x < agri.length; x++)
		{
			total_agri = total_agri + agri[x];
		}
		avg_agri = total_agri / agri.length;
		sector.push({"key" :"Agriculture","value" : avg_agri});
		console.log(avg_agri);
		
		total_indus = 0;
		for(var x = 0; x < industry.length; x++)
		{
			total_indus = total_indus + industry[x];
		}
		avg_indus = total_indus / industry.length;
		sector.push({"key" :"Industry","value" : avg_indus});
		console.log(avg_indus);
		
		total_service = 0;
		for(var x = 0; x < service.length; x++)
		{
			total_service = total_service + service[x];
		}
		avg_service = total_service / service.length;
		sector.push({"key" :"Services","value" : avg_service});
		console.log(avg_service);
		
		return sector;
	}
	if((year == "All") && (countries != "All"))
	{
		data.forEach(function(d){
		
			if(d.country == countries)
			{
				agri.push(d.agriculture);
				industry.push(d.industries);
				service.push(d.services);
			}
		});
		total_agri = 0;
		for(var x = 0; x < agri.length; x++)
		{
			total_agri = total_agri + agri[x];
		}
		avg_agri = total_agri / agri.length;
		sector.push({"key" :"Agriculture","value" : avg_agri});
		console.log(avg_agri);
		
		total_indus = 0;
		for(var x = 0; x < industry.length; x++)
		{
			total_indus = total_indus + industry[x];
		}
		avg_indus = total_indus / industry.length;
		sector.push({"key" :"Industry","value" : avg_indus});
		console.log(avg_indus);
		
		total_service = 0;
		for(var x = 0; x < service.length; x++)
		{
			total_service = total_service + service[x];
		}
		avg_service = total_service / service.length;
		sector.push({"key" :"Services","value" : avg_service});
		console.log(avg_service);
		
		return sector;
	}
	if((year != "All" )&& (countries != "All"))
	{
		data.forEach(function(d){
			if((d.year == year) && (d.country == countries))
			{
				agri.push(d.agriculture);
				industry.push(d.industries);
				service.push(d.services);
			}
			
		});
		total_agri = 0;
		for(var x = 0; x < agri.length; x++)
		{
			total_agri = total_agri + agri[x];
		}
		avg_agri = total_agri / agri.length;
		sector.push({"key" :"Agriculture","value" : avg_agri});
		console.log(avg_agri);
		
		total_indus = 0;
		for(var x = 0; x < industry.length; x++)
		{
			total_indus = total_indus + industry[x];
		}
		avg_indus = total_indus / industry.length;
		sector.push({"key" :"Industry","value" : avg_indus});
		console.log(avg_indus);
		
		total_service = 0;
		for(var x = 0; x < service.length; x++)
		{
			total_service = total_service + service[x];
		}
		avg_service = total_service / service.length;
		sector.push({"key" :"Services","value" : avg_service});
		console.log(avg_service);
		return sector;
	}
	
	if((year != "All" )&& (countries == "All"))
	{
		data.forEach(function(d){
			if((d.year == year))
			{
				agri.push(d.agriculture);
				industry.push(d.industries);
				service.push(d.services);
			}
			
		});
		total_agri = 0;
		for(var x = 0; x < agri.length; x++)
		{
			total_agri = total_agri + agri[x];
		}
		avg_agri = total_agri / agri.length;
		sector.push({"key" :"Agriculture","value" : avg_agri});
		console.log(avg_agri);
		
		total_indus = 0;
		for(var x = 0; x < industry.length; x++)
		{
			total_indus = total_indus + industry[x];
		}
		avg_indus = total_indus / industry.length;
		sector.push({"key" :"Industry","value" : avg_indus});
		console.log(avg_indus);
		
		total_service = 0;
		for(var x = 0; x < service.length; x++)
		{
			total_service = total_service + service[x];
		}
		avg_service = total_service / service.length;
		sector.push({"key" :"Services","value" : avg_service});
		console.log(avg_service);
		return sector;
	}
	
	
	
}




draw_chart_filtered1 = function (data)
{
	var svg = d3.select("#svg3");
    svg.selectAll("*").remove();
	console.log(data[0].value);
	if((data[0].value > 0 ) && (data[1].value > 0) && (data[2].value > 0))
	{
		//sorting data 
		data.sort(function(x, y){
			console.log(x.value,y.value);
			return d3.ascending(x.value, y.value);
			})
		console.log(data);
		data2 = [];
		
		for(var x = 0; x < data.length; x++)
		{
			data2.push(data[x].key);
		}
		var size = data2.length;
		console.log(size);
		
		//size of svg
		var height = size*125;
		var width = 600;
		
		//scaling for xAxis
		var xScale = d3.scaleLinear()
				.domain([0,d3.max(data,function(d){ return d.value;})])
				.range([0,width/1.75])
				.nice();
				
		//scaling for yAxis			
		var yScale = d3.scaleBand()
					.domain(data2)
					.range([-5,size*50]);
	  
		//xAxis according to xScale			
		var xAxis = d3.axisBottom()
					.scale(xScale)
					.ticks();
					
		//yAxis according to yScale
		var yAxis = d3.axisLeft()
					.scale(yScale);
		
		
		//seleting the svg 			
		var canvas = d3.select("#svg3")
					.attr("height",height)
					.attr("width",width)
					.append("g")
					.attr("transform","translate(60,110)");
					
		//Creating the bars							
		var bar = canvas.selectAll("rect")
					.data(data)
					.enter()
					.append("rect")
					.attr("height", function(d,i){
								yScale(d.key);
								return 40;
								})
					.attr("width", function(d){
						return xScale(d.value);
					})
					.attr("y", function(d,i){
						return i * 50;
					})
					.attr("x", 100)
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
								.text(d.key + " : "+d.value.toFixed(2)+"%");
					});
					
		//adding tooltip
		var tooltip = canvas.append("g")
							.attr("class","tooltip")
							.style("display","none")
				tooltip.append("rect")
						.attr("height",30)
						.attr("width",130)
						.attr("x",50)
						.attr("y",-20);
				tooltip.append("text")
						.attr("x",55)
						.attr("y",0)
						.style("fill", "blue")
						.style("font-size","14px")
						.style("font-family", "Times New Roman")
						.attr("font-weight","bold");
					
		//calling xAxis			
		canvas.append("g")
			.call(xAxis)
			.attr("transform","translate(100,"+size*50+")");
			
		//calling yAxis	
		canvas.append("g")
			.call(yAxis)
			.attr("transform","translate(90,0)");
			
		//labelling xAxis	
		canvas.append("g")
		.append("text")
		.attr("class", "xlabel")
		.attr("text-anchor", "end")
		.attr("font-family", "Times New Roman")
		.attr("font-size" ,"16px")
		.attr("font-weight","bold")
		.text("Employment(%)")
		.attr("transform","translate(317,"+size*70+")");
		
		//labelling yAxis
		canvas.append("g")
		.append("text")
		.attr("class", "ylabel")
		.attr("text-anchor", "end")
		.attr("font-family", "Times New Roman")
		.attr("font-size" ,"16px")
		.attr("y", 10)
		.attr("x", -size*20+10)
		.attr("font-weight","bold")
		.text("Sector")
		.attr("transform","rotate(-90)");
		
		//labelling title of graph
		canvas.append("g")
			.append("text")
			.attr("text-anchor", "middle")  
			.style("font-size", "20px") 
			.attr("font-weight","bold")
			.text("Rate of Employment by Sector(%)")
			.attr("transform","translate(250,-60)");
	}
	else
	{
		var height = 375;
		var width = 600;
		var canvas = d3.select("#svg3")
					.attr("height",height)
					.attr("width",width);
			
		var Text = canvas.append("text");
				
				Text.attr("x",100)
					.attr("y",200)
					.style("fill", "green")
					.style("font-size","22px")
					.style("font-family", "Times New Roman")
					.attr("font-weight","bold");
			Text.text("Sorry, No data Available for Selected Year!");
	}
}
//function to get desired data for graph
var change_data = function(data)
{
	agri = [];
	service=[];
	industry =[];
	sector=[];
	data.forEach(function(d){
		agri.push(d.agriculture);
		industry.push(d.industries);
		service.push(d.services);
	});
	
	total_agri = 0;
	for(var x = 0; x < agri.length; x++)
	{
		total_agri = total_agri + agri[x];
	}
	avg_agri = total_agri / agri.length;
	sector.push({"key" :"Agriculture","value" : avg_agri});
	console.log(avg_agri);
	
	total_indus = 0;
	for(var x = 0; x < industry.length; x++)
	{
		total_indus = total_indus + industry[x];
	}
	avg_indus = total_indus / industry.length;
	sector.push({"key" :"Industry","value" : avg_indus});
	console.log(avg_indus);
	
	total_service = 0;
	for(var x = 0; x < service.length; x++)
	{
		total_service = total_service + service[x];
	}
	avg_service = total_service / service.length;
	sector.push({"key" :"Services","value" : avg_service});
	console.log(avg_service);
	
	return sector;
};

//function for drawing 
var draw_chart = function(data)
{
	//sorting data 
	data.sort(function(x, y){
		console.log(x.value,y.value);
		return d3.ascending(x.value, y.value);
		})
	data2 = [];
	
	for(var x = 0; x < data.length; x++)
	{
		data2.push(data[x].key);
	}
	var size = data2.length;
	console.log(size);
	
	//size of svg
	var height = size*125;
	var width = 600;
	
	//scaling for xAxis
	var xScale = d3.scaleLinear()
			.domain([0,d3.max(data,function(d){ return d.value;})])
			.range([0,width/1.75])
			.nice();
			
	//scaling for yAxis			
	var yScale = d3.scaleBand()
				.domain(data2)
				.range([-5,size*50]);
  
	//xAxis according to xScale			
	var xAxis = d3.axisBottom()
				.scale(xScale)
				.ticks(5);
				
	//yAxis according to yScale
	var yAxis = d3.axisLeft()
				.scale(yScale);
	
	
	//seleting the svg 			
	var canvas = d3.select("#svg3")
				.attr("height",height)
				.attr("width",width)
				.append("g")
				.attr("transform","translate(60,110)");
				
	//Creating the bars							
	var bar = canvas.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("height", function(d,i){
							yScale(d.key);
							return 40;
							})
				.attr("width", function(d){
					return xScale(d.value);
				})
				.attr("y", function(d,i){
					return i * 50;
				})
				.attr("x", 100)
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
							.text(d.key + " : "+d.value.toFixed(2)+"%");
				});
				
	//adding tooltip
	var tooltip = canvas.append("g")
						.attr("class","tooltip")
						.style("display","none")
			tooltip.append("rect")
					.attr("height",30)
					.attr("width",130)
					.attr("x",50)
					.attr("y",-20);
			tooltip.append("text")
					.attr("x",55)
					.attr("y",0)
					.style("fill", "blue")
					.style("font-size","14px")
					.style("font-family", "Times New Roman")
					.attr("font-weight","bold");
				
	//calling xAxis			
	canvas.append("g")
		.call(xAxis)
		.attr("transform","translate(100,"+size*50+")");
		
	//calling yAxis	
	canvas.append("g")
		.call(yAxis)
		.attr("transform","translate(90,0)");
		
	//labelling xAxis	
	canvas.append("g")
	.append("text")
    .attr("class", "xlabel")
    .attr("text-anchor", "end")
	.attr("font-family", "Times New Roman")
	.attr("font-size" ,"16px")
	.attr("font-weight","bold")
    .text("Employment(%)")
	.attr("transform","translate(317,"+size*70+")");
	
	//labelling yAxis
	canvas.append("g")
	.append("text")
    .attr("class", "ylabel")
    .attr("text-anchor", "end")
	.attr("font-family", "Times New Roman")
	.attr("font-size" ,"16px")
    .attr("y", 10)
	.attr("x", -size*20+10)
	.attr("font-weight","bold")
    .text("Sector")
	.attr("transform","rotate(-90)");
	
	//labelling title of graph
	canvas.append("g")
		.append("text")
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
		.attr("font-weight","bold")
        .text("Rate of Employment by Sector(%)")
		.attr("transform","translate(250,-60)");
	
}
