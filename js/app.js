function removeContact(id) {
    const contactList = JSON.parse(localStorage.getItem('phonebook'));
    contactList = contactList.filter(item => item.id !== id);
    localStorage.setItem('phonebook', JSON.stringify(contactList));
    initTable();
}

document.getElementById('frm').addEventListener('submit', e => {
    e.preventDefault()

})

function deleteRowTable() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}