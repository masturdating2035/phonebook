madeTable();

function edit(id) {
    let contactList = JSON.parse(localStorage.getItem('contactList'));
    let contact = contactList.find(item => item.id == id)
    document.getElementById('id').value = contact.id
    document.getElementById('name').value = contact.name
    document.getElementById('lastName').value = contact.lastName
    document.getElementById('phone').value = contact.phone
    document.getElementById('email').value = contact.email
    document.getElementById('birthday').value = contact.birthday
    document.getElementById('address').value = contact.address
    document.getElementById('details').value = contact.details
}


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
        <button onclick="edit(${contact.id})" class="btn btn-primary" style="padding:0 20px; font-size:15px"> <i class='fa fa-edit'></i></button></td>`;
        tbody.appendChild(tr);
    })
    table.appendChild(tbody)
}

document.getElementById('frm').addEventListener('submit', e => {
    e.preventDefault();
    let contactList = JSON.parse(localStorage.getItem('contactList'));
    const getForm = new FormData(e.target);
    let newContact = {};
    for (let item of getForm.entries()) {
        newContact[item[0]] = item[1]
    }

    const contact = contactList.find(item => item.id == newContact.id)
    if (contact) {
        contactList = contactList.map(item => item.id == newContact.id ? newContact : item)
    } else {
        contactList.push(newContact);
    }
    // contactList = [...contactList, newContact]
    localStorage.setItem('contactList', JSON.stringify(contactList))
    madeTable();
    e.target.reset()
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