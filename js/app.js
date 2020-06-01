// function removeContact(id) {
//     const contactList = JSON.parse(localStorage.getItem('phonebook'));
//     contactList = contactList.filter(item => item.id !== id);
//     localStorage.setItem('phonebook', JSON.stringify(contactList));
//     initTable();
// }
madeTable();

function removeContact(id) {
    let contactList = JSON.parse(localStorage.getItem('contactList'));
    contactList = contactList.filter(item => item.id != id)
    localStorage.setItem('contactList', JSON.stringify(contactList))
    madeTable()
}
function madeTable() {
    const contactList = JSON.parse(localStorage.getItem('contactList'));
    if (!contactList) {
        localStorage.setItem('contactList', JSON.stringify([]))
        return;
    }
    const delTbody = document.getElementsByTagName('tbody');
    if (delTbody.length > 0) {
        delTbody[0].remove();
    }

    const table = document.getElementById('contact-table');
    const tbody = document.createElement('tbody');


    contactList.map(contact => {
        const tr = document.createElement('tr');

        tr.innerHTML = `<td>${contact.id}</td><td>${contact.name}</td><td>${contact.lastName}</td>
        <td>${contact.phone}</td><td>${contact.email}</td><td>${contact.address}</td>
        <td>${contact.birthday}</td><td>${contact.details}</td>
        <td> <button onclick="deleteRowTable(${contact.id})" class="btn btn-danger" style="padding:0 20px; font-size:15px"> <i class='fa fa-trash '></i></button>
        <button class="btn btn-primary" style="padding:0 20px; font-size:15px"> <i class='fa fa-edit'></i></button></td>`;
        tbody.appendChild(tr);
    })
    table.appendChild(tbody)
}

document.getElementById('frm').addEventListener('submit', e => {
    e.preventDefault();
    const contactList = JSON.parse(localStorage.getItem('contactList'));
    const getForm = new FormData(e.target);
    let newContact = {};
    for (let item of getForm.entries()) {
        newContact[item[0]] = item[1]
    }
    // contactList = [...contactList, newContact]
    contactList.push(newContact);
    localStorage.setItem('contactList', JSON.stringify(contactList))
    madeTable();
})




function deleteRowTable(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'مطمئنی؟',
        text: "نمیتونی برگردونیش",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'آره بابا پاکش کن',
        cancelButtonText: 'نه تروخدا پاکش نکن',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            removeContact(id)
            swalWithBootstrapButtons.fire(
                'پاک شد',
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'کنسل شد',
                'تو در امانی',
            )
        }
    })
}