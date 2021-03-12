d3.csv("labour.csv",function(d)
{
	return{
		country : d.Country,
		year : d.Year
	};
	
}).then(function(data,error)
{
	var data1 = getcountry(data);
	create_country(data1);
	var data2 = getyear(data);
	create_year(data2);
	
	
});

var getcountry = function(data)
{
	var all_country = [];
		var allCountry = d3.nest()
						.key(function(d){ return d.country;})
						.entries(data);
		for(var x = 0; x < allCountry.length; x++)
		{
			all_country.push(allCountry[x].key);
			
		}
		return all_country;
};

var create_country = function(data){
	
	var select = document.getElementById("country");
	var option = document.createElement("OPTION"),
		       text = document.createTextNode("All");
		option.appendChild(text);
		select.insertBefore(option,select.lastChild);
	
	for(var x = 0; x < data.length; x++)
	{
		var option = document.createElement("OPTION"),
		       text = document.createTextNode(data[x]);
		option.appendChild(text);
		select.insertBefore(option,select.lastChild);
	}
	
};

  
var getyear = function(data)
{
	var all_year = [];
		var allYear = d3.nest()
						.key(function(d){ return d.year;})
						.entries(data);
						
		for(var x = 0; x < allYear.length; x++)
		{
			all_year.push(allYear[x].key);
			
		}
		return all_year;
};

var create_year = function(data){
	
	var select = document.getElementById("year");
	var option = document.createElement("OPTION"),
		       text = document.createTextNode("All")
		option.appendChild(text);
		select.insertBefore(option,select.lastChild);
	for(var x = 0; x < data.length; x++)
	{
		var option = document.createElement("OPTION"),
		       text = document.createTextNode(data[x]);
		option.appendChild(text);
		select.insertBefore(option,select.lastChild);
	}
	
};



  