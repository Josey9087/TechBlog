commentFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const body = document.querySelector('#comment-body').value.trim();
  
    if (body) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/post/comment', {
        method: 'POST',
        body: JSON.stringify({ body }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.comment')
    .addEventListener('submit', commentFormHandler);