fetch("http://localhost:3000/ads/list-ads-info")      
  .then((response) => response.json())
  .then((jsonData) => {

    let listData = `<tr><th>Ads ID</th><th>Ads Name</th><th>Ads Filename</th><th>Enable</th><th>Delete</th></tr>`;

    jsonData.result.forEach((ads) => {
      listData += `<tr>
        <td>${ads.adsId}</td>
        <td>${ads.adsName} </td>
        <td><a href="/Users/Admin/Desktop/Group2/frontend/storage/${ads.adsFliename}">${ads.adsFliename}</a></td>
		<td>${ads.enable}</td>
		<td><button onclick="deleteAds(${ads.adsId})">delete</button></td>
      </tr>`;
    });

    document.getElementById("ads").innerHTML = listData;
  });

  function deleteAds(adsId) {
    if (confirm(`คุณต้องการลบ id = ${adsId} หรือไม่?`)) {
      fetch(`http://localhost:3000/ads/delete/${adsId}`, {
        method: 'DELETE'
      })
  .then(response => {
      if (response.ok)    {
        // deleted then refresh the page
        location.reload();
        } else {
    }
    })
}
}