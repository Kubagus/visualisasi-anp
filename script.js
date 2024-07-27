document.addEventListener("DOMContentLoaded", function () {
	// Function to load JSON data
	async function loadJSON(file) {
		const response = await fetch(file);
		const data = await response.json();
		return data;
	}

	// Function to generate tables
	function generateTable(tableId, data) {
		const table = document.getElementById(tableId);
		const tbody = document.createElement("tbody");

		data.forEach((row, rowIndex) => {
			const tr = document.createElement("tr");
			row.forEach((cell) => {
				const td = document.createElement(rowIndex === 0 ? "th" : "td");
				td.innerText = cell;
				tr.appendChild(td);
			});
			tbody.appendChild(tr);
		});

		table.appendChild(tbody);
	}

	// Function to generate charts
	function generateChart(chartId, labels, datasetLabel, data) {
		const ctx = document.getElementById(chartId).getContext("2d");

		const chartData = {
			labels: labels,
			datasets: [
				{
					label: datasetLabel,
					data: data,
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
					],
					borderWidth: 1,
				},
			],
		};

		const options = {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		};

		new Chart(ctx, {
			type: "bar",
			data: chartData,
			options: options,
		});
	}

	// Load and generate tables and charts for each dataset
	loadJSON("unweighted.json").then((data) => {
		generateTable("unweightedTable", data.data);
		generateChart(
			"unweightedChart",
			["Ayam Gepek", "Nasi Padang", "Soto", "Warteg"],
			"Unweighted Scores",
			[0.271974, 0.482886, 0.08815, 0.15699]
		);
	});

	loadJSON("weighted.json").then((data) => {
		generateTable("weightedTable", data.data);
		generateChart(
			"weightedChart",
			["Ayam Gepek", "Nasi Padang", "Soto", "Warteg"],
			"Weighted Scores",
			[0.183673, 0.326109, 0.059531, 0.10602]
		);
	});

	loadJSON("limit.json").then((data) => {
		generateTable("limitTable", data.data);
		generateChart(
			"limitChart",
			["Ayam Gepek", "Nasi Padang", "Soto", "Warteg"],
			"Limit Scores",
			[0.120777, 0.125876, 0.054987, 0.096039]
		);
	});

	loadJSON("cluster.json").then((data) => {
		generateTable("clusterTable", data.data);
		generateChart(
			"clusterChart",
			[
				"Alternative",
				"Goal",
				"Krtiteria",
				"Sub Kriteria Fasilitas",
				"Sub Kriteria Kualitas Makanan",
			],
			"Cluster Scores",
			[0.0, 0.0, 1.0, 0.0, 0.0]
		);
	});
});
