function showCalculator() {
    document.getElementById('calculatorSection').style.display = 'block';
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('materialSection').style.display = 'none';
}


function showProfile() {
    document.getElementById('calculatorSection').style.display = 'none';
    document.getElementById('profileSection').style.display = 'block';
    document.getElementById('materialSection').style.display = 'none';
}


function showMaterial() {
    document.getElementById('calculatorSection').style.display = 'none';
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('materialSection').style.display = 'block';
}





function appendToFunction(value) {
    const functionInput = document.getElementById('function');
    const limitInput = document.getElementById('limit');


    // Hanya tambahkan ke fungsi jika tidak di kolom nilai batas
    if (limitInput !== document.activeElement) {
        const lastChar = functionInput.value.charAt(functionInput.value.length - 1);
        if (!isNaN(lastChar) && value === 'x') {
            functionInput.value += '*';
        }
        functionInput.value += value;
    }
}


function clearFunction() {
    document.getElementById('function').value = '';
    document.getElementById('limit').value = '';
    document.getElementById('limitResultText').innerText = "Hasil Limit"; // Menambahkan ini untuk mengembalikan teks "Hasil Limit"
    document.getElementById('outputLimit').innerText = ''; // Menambahkan ini untuk menghapus output limit
}


function appendToLimit(value) {
    document.getElementById('limit').value += value;
}


function calculateLimit() {
    const functionInput = document.getElementById('function').value;
    const limitInput = document.getElementById('limit').value;


    if (functionInput.trim() === "" || isNaN(limitInput)) {
        alert("Mohon masukkan fungsi dan nilai batas yang valid.");
        return;
    }


    try {
        const sanitizedFunction = functionInput.replace(/\^/g, '**').replace(/∞/g, 'Infinity');
        const result = Function('x', 'return ' + sanitizedFunction)(parseFloat(limitInput));


        // Menampilkan hasil limit dan menghapus output limit
        document.getElementById('limitResultText').innerText = "Hasil Limit";
        document.getElementById('outputLimit').innerText = result;


        // Gambar grafik fungsi
        drawGraph(sanitizedFunction);
    } catch (error) {
        alert("Terjadi kesalahan dalam menghitung limit. Pastikan fungsi Anda valid.");
    }
}


// ... (Fungsi-fungsi lainnya)


function drawGraph(functionString) {
    const x = [...Array(100).keys()]; // Generate x values
    const y = x.map(x => eval(functionString.replace("x", x)));


    const trace = {
        x: x,
        y: y,
        type: "scatter",
        mode: "lines"
    };


    const layout = {
        title: "Grafik Fungsi",
        xaxis: {
            title: "x"
        },
        yaxis: {
            title: "f(x)"
        }
    };


    Plotly.newPlot('plot', [trace], layout);
}

