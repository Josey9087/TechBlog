postFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
  
    if (title && body) {
      // Send a POST request to the API endpoint
      const response = await fetch('http://localhost:3001/api/post/posting', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('http://localhost:3001/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };


deleteFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const id = event.target.getAttribute('data-delete');
  

      // Send a POST request to the API endpoint
      const response = await fetch(`http://localhost:3001/api/post/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('http://localhost:3001/dashboard');
      } else {
        alert(response.statusText);
      
    }
  };
  
  document
    .querySelector('.post')
    .addEventListener('submit', postFormHandler);

document.querySelector('.delete').addEventListener('click', deleteFormHandler)

