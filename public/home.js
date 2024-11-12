$('#submit').on(
    'click',
    async function(e)
    {
        let
            number = $('#number'),
            subject = $('#subject'),
            referral = $('#referraldrop')
        ;

        if(referral.val() == '')
        {
            alert('یک عنوان را انتخاب کنید');
            return;
        }
        else
            if(number.val() == '')
            {
                alert('شماره را وارد کنید');
                return;
            }
        else
            if(subject.val() == '')
            {
                alert('موضوع را وارد کنید');
                return;
            }

        try
        {
            const response = await fetch(
                '/api/add-item',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        number: number.val(),
                        subject : subject.val(),
                        role : referral.val()
                    }),
                }
            );

            if(response.ok)
            {
                alert('اطلاعات با موفقیت اضافه شد');
                number.val('');
                subject.val('');
                referral.val('');
            }
        }
        catch (error)
        {
            console.error('Error adding item:', error);
        }
});

$('#referraldrop').on(
    'change',
    async function(e)
    {
        let selectedValue = $(this).val();
        let response =
            await fetch(
                '/api/items',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ role: selectedValue }),
                }
            )
        ;
        response = await response.json();
        if(response.length !== 0)
        {
            $('#referralResult').empty();
            for(let record of response)
                $('#referralResult')
                    .append(
                        $('<p>')
                            .text(`${record.number} - گیرنده (${record.role}) وضعیت: (${record.status}) در تاریخ (${record.date})`)
                    )
        }
        else
            $('#referralResult')
                .text(``)
    }
);