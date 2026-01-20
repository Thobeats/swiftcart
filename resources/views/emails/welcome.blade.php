<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to SwiftCart</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        body {
            background-color: #f5f7fa;
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
        }

        .header {
            background: #0d6efd;
            color: #ffffff;
            padding: 24px;
            text-align: center;
        }

        .content {
            padding: 32px;
            color: #333333;
        }

        .button {
            display: inline-block;
            margin-top: 24px;
            padding: 14px 24px;
            background: #0d6efd;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
        }

        .footer {
            padding: 20px;
            font-size: 12px;
            color: #777777;
            text-align: center;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>Welcome to SwiftCart 🎉</h1>
    </div>

    <div class="content">
        <p>Hi {{ $user->name }},</p>

        <p>
            Welcome to <strong>SwiftCart</strong>!
            We’re excited to have you on board.
        </p>

        <p>
            Before you get started, please verify your email address by clicking the button below:
        </p>

        <p style="text-align: center;">
            <a href="{{ $user->verification_link }}" class="button">
                Verify Email Address
            </a>
        </p>

        <p>
            If you did not create an account, no action is required.
        </p>

        <p>
            Thanks,<br>
            <strong>The SwiftCart Team</strong>
        </p>
    </div>

    <div class="footer">
        © {{ date('Y') }} SwiftCart. All rights reserved.
    </div>
</div>

</body>
</html>
