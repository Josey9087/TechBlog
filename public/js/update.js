const updateFormHandler = async (event) => {
  event.preventDefault();
  const id = document.querySelector('#update').getAttribute('data-update')
  const title = document.querySelector('#update-title').value.trim();
  const body = document.querySelector('#update-body').value.trim();
  console.log(id)
    userdata = {"title": title,
                "body": body}
                    console.log(JSON.stringify(userdata))
                    console.log(userdata)
    try {
        fetch(`/api/post/dashboard/${id}`, {
  method: 'PUT', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userdata),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  window.location.href = `/dashboard`
})
.catch((error) => {
  console.error('Error:', error);
});
    } catch (err) {
        console.log(err);
    }
}
document.querySelector('#update').addEventListener('click', updateFormHandler)