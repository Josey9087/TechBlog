updateFormHandler = async (event) => {
    event.preventDefault();
    var target = event.currentTarget
    // Collect values from the login form
    const id = target.getAttribute('data-update');
    const updatetitle = target.closet('.update-title').value.trim();
    const updatebody = target.closet('.update-body').value.trim();
  
    if (updatetitle & updatebody) {
      // Send a POST request to the API endpoint
      const response = await fetch(`http://localhost:3001/api/post/dashboard/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title: updatetitle, body: updatebody }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('http://localhost:3001/home');
      } else {
        document.location.replace('http://localhost:3001/home');
      }
    }
  };


  document.querySelector('.update').addEventListener('submit', updateFormHandler)