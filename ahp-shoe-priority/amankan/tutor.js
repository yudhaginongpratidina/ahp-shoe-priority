const data = {
    "status": 200,
    "message": "Success",
    "data": [
      {
        "id": "clwnmyhxr0000uk8m4pl3p3ap",
        "name": "Nama",
        "bobot": 1,
        "createdAt": "2024-05-26T14:29:23.919Z",
        "updatedAt": "2024-05-26T14:29:23.919Z"
      },
      {
        "id": "clwnmzq7h0001uk8mrtew7mwu",
        "name": "Nama a",
        "bobot": 3,
        "createdAt": "2024-05-26T14:30:21.293Z",
        "updatedAt": "2024-05-26T14:30:21.293Z"
      },
      {
        "id": "clwnn1aqz0002uk8myjaqlc81",
        "name": "Hore",
        "bobot": 5,
        "createdAt": "2024-05-26T14:31:34.571Z",
        "updatedAt": "2024-05-26T14:31:34.571Z"
      }
    ]
  };
  
  // Matriks perbandingan berpasangan
  const comparisonMatrix = data.data.map(row => {
    return data.data.map(col => {
      if (row.name === col.name) return 1;
      return row.bobot / col.bobot;
    });
  });
  
  console.log("Matriks Perbandingan Berpasangan:");
  console.log(comparisonMatrix);
  
  // Menghitung jumlah per kolom dari matriks perbandingan
  const totalPerColumn = Array.from(Array(data.data.length), () => 0);
  comparisonMatrix.forEach(row => {
    row.forEach((val, index) => {
      totalPerColumn[index] += val;
    });
  });
  
  console.log("Jumlah Per Kolom:");
  console.log(totalPerColumn);
  
  // Normalisasi matriks perbandingan
  const normalizedMatrix = comparisonMatrix.map(row => {
    return row.map((val, index) => val / totalPerColumn[index]);
  });
  
  console.log("Matriks Perbandingan yang Dinormalisasi:");
  console.log(normalizedMatrix);
  
  // Menghitung jumlah per kolom dari matriks normalisasi
  const totalPerColumnNormalized = normalizedMatrix.reduce((acc, row) => {
    row.forEach((val, index) => {
      acc[index] += val;
    });
    return acc;
  }, Array.from(Array(data.data.length), () => 0));
  
  console.log("Jumlah Per Kolom dari Matriks Normalisasi:");
  console.log(totalPerColumnNormalized);
  
  // Menghitung jumlah per baris dari matriks normalisasi
  const totalPerRowNormalized = normalizedMatrix.map(row =>
    row.reduce((acc, val) => acc + val, 0)
  );
  
  console.log("Jumlah Per Baris dari Matriks Normalisasi:");
  console.log(totalPerRowNormalized);
  
  // Menghitung eigenvalue
  const eigenvalues = normalizedMatrix.map(row => row.reduce((acc, val) => acc + val, 0) / normalizedMatrix.length);
  
  console.log("Eigenvalues:");
  console.log(eigenvalues);
  
  // Menghitung jumlah eigenvalue
  const sumEigenvalues = eigenvalues.reduce((acc, val) => acc + val, 0);
  
  console.log("Jumlah Eigenvalues:");
  console.log(sumEigenvalues);
  
  // Menghitung eigenvector
  const eigenvector = eigenvalues.map(val => val / sumEigenvalues);
  
  console.log("Eigenvector:");
  console.log(eigenvector);
  
  // Menghitung Consistency Index (CI)
  const n = data.data.length;
  const lambdaMax = eigenvector.reduce((acc, val, index) => acc + val * comparisonMatrix[index][index], 0);
  const consistencyIndex = (lambdaMax - n) / (n - 1);
  
  console.log("Consistency Index (CI):", consistencyIndex);
  
  // Mendapatkan nilai Random Index (RI)
  const randomIndex = {
    1: 0,
    2: 0,
    3: 0.58,
    4: 0.90,
    5: 1.12,
    6: 1.24,
    7: 1.32,
    8: 1.41,
    9: 1.45,
    10: 1.49
  };
  
  const RI = randomIndex[n];
  
  // Menghitung Consistency Ratio (CR)
  const consistencyRatio = consistencyIndex / RI;
  
  console.log("Consistency Ratio (CR):", consistencyRatio);
  
  // Penentuan konsistensi
  const consistencyThreshold = 0.1; // Threshold konsistensi yang diinginkan
  const isConsistent = consistencyRatio < consistencyThreshold;
  
  console.log("Apakah konsisten?");
  console.log(isConsistent);
  
  // Menambahkan nama kriteria dan bobot akhirnya
  const prioritiesWithCriteria = data.data.map((item, index) => ({
    kriteria: item.name,
    prioritas: eigenvector[index],
    bobot_akhir: item.bobot * eigenvector[index]
  }));
  
  console.log("Kriteria dengan Prioritas dan Bobot Akhir:");
  console.log(prioritiesWithCriteria);
  