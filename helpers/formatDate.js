function formatDate(date) {
    if (!date) return 'Tanggal tidak valid';
    
    // Opsi format: Kamis, 20 November 2025
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    return date.toLocaleDateString('id-ID', options);
}

module.exports = formatDate;