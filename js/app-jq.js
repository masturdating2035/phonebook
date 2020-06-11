madeTable(JSON.parse(localStorage.getItem('contactList')));
checkBirthday()


function checkBirthday() {
    let contacts = JSON.parse(localStorage.getItem('contactList'));

    contacts.each(contact => {
        const birthday = new Date(contact.birthday)
        let birthday_day = birthday.getDate()
        let birthday_month = birthday.getMonth()

        let today = new Date();
        let today_day = today.getDate()
        let today_month = today.getMonth()

        if (today_day == birthday_day && today_month == birthday_month) {
            Swal.fire({
                title: 'تولدت مبارک عشقم',
                text: ` ${contact.name} تولد تولد، تولدت مبارک`,
                imageUrl: 'https://unsplash.it/400/200',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
            })
        }
    })
}

function setContacts(contacts) {
    localStorage.setItem('contactList', JSON.stringify(contacts))
    madeTable(contacts)
}

function edit(id) {
    let contactList = JSON.parse(localStorage.getItem('contactList'));
    let contact = contactList.find(item => item.id == id)
    $('#id').val(contact.id)
    $('#name').val(contact.name)
    $('#lastName').val(contact.lastName)
    $('#phone').val(contact.phone)
    $('#email').val(contact.email)
    $('#birthday').val(contact.birthday)
    $('#address').val(contact.address)
    $('#details').val(contact.details)
}


function removeContact(id) {
    let contactList = JSON.parse(localStorage.getItem('contactList'));
    contactList = contactList.filter(item => item.id != id)
    setContacts(contactList)
}

function madeTable(contacts) {
    const delTbody = document.getElementsByTagName('tbody');
    if (delTbody.length > 0) {
        delTbody[0].remove();
    }

    const table = $('#contact-table');
    const tbody = $("<tbody></tbody>");

    contacts.map(contact => {
        const tr = $("<tr></tr>").append(
            `<td>${contact.id}</td><td>${contact.name}</td><td>${contact.lastName}</td>
            <td>${contact.phone}</td><td>${contact.email}</td><td>${contact.address}</td>
            <td>${contact.birthday}</td><td>${contact.details}</td>
            <td> <button onclick="deleteRowTable(${contact.id})" class="btn btn-danger" style="padding:0 20px; font-size:15px"> <i class='fa fa-trash '></i></button>
            <button onclick="edit(${contact.id})" class="btn btn-primary" style="padding:0 20px; font-size:15px"> <i class='fa fa-edit'></i></button></td>`
        )
         
        tbody.append(tr);
    })
    table.append(tbody)
}

$('#frm').on('submit', e => {
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
    setContacts(contactList)
    e.target.reset()
})



$('#form-search').on('submit', e => {
    e.preventDefault();
    let contactList = JSON.parse(localStorage.getItem('contactList'));
    let search = $('#form-search-input').val()
    contactList = contactList.filter(item => item.name.toLowerCase().startsWith(search.toLowerCase()))
    madeTable(contactList)

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