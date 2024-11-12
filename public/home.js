const positions = {
    "مدیریت": ["مدیر عامل", "معاون مدیر", "مدیر اجرایی", "مدیر پروژه", "مشاور اجرایی"],
    "فناوری اطلاعات": ["کارشناس فناوری اطلاعات", "تحلیل‌گر داده", "مدیر IT", "کارشناس IT"],
    "مالی و حسابداری": ["مدیر مالی", "کارشناس حسابداری"],
    "بازاریابی و فروش": ["کارشناس فروش", "کارشناس بازاریابی", "مدیر محتوا"],
    "منابع انسانی": ["مدیر منابع انسانی", "کارشناس منابع انسانی"],
    "خدمات مشتریان": ["مدیر خدمات مشتریان", "کارشناس خدمات مشتریان"],
};

function updatePositions()
{
    const selectedTopic = $("#topics").val();
    const $positions = $("#positions");

    $positions.empty();

    if(positions[selectedTopic])
    {
        positions[selectedTopic].forEach(
            position => 
            {
                $positions.append($("<option>", { value: position, text: position }));
            }
        );
    } 
    else
        $positions.append($("<option>", { value: "", text: "هیچ سمتی وجود ندارد" }));
}

$("#topics").change(updatePositions);

$('#submit').click(async function (e)
{
    const number = $('#number').val();
    const topic = $('#topics').val();
    const role = $('#positions').val();

    if(!role) {
        alert('یک عنوان را انتخاب کنید');
        return;
    }
    if(!number) {
        alert('شماره را وارد کنید');
        return;
    }
    if(!topic) {
        alert('موضوع را وارد کنید');
        return;
    }

    try
    {
        const response = await fetch('/api/add-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                number, topic, role
            }),
        });

        if(response.ok) 
        {
            alert('اطلاعات با موفقیت اضافه شد');
            $('#number').val('');
            $('#topics').val('');
            $('#positions').val('');
        }
    } 
    catch (error)
    {
        console.error('Error adding item:', error);
        alert('An error occurred. Please try again later.');
    }
});

$('#referraldrop').change(async function (e) 
{
    const selectedValue = $(this).val();
    const $referralResult = $('#referralResult');

    try {
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: selectedValue }),
        });
        const data = await response.json();

        $referralResult.empty();
        if(data.length)
            data.forEach(record =>
            {
                $referralResult.append(
                    $('<p>').text(`${record.number} - گیرنده (${record.role}) وضعیت: (${record.status}) در تاریخ (${record.date})`)
                );
            });
        else
            $referralResult.text('No records found');
    } 
    catch (error)
    {
        console.error('Error fetching items:', error);
        alert('An error occurred. Please try again later.');
    }
});