<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Low Stock Alert - SwiftCart</title>
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
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .header {
            background: #dc3545; /* red alert color */
            color: #ffffff;
            padding: 24px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 32px;
            color: #333333;
        }

        .product-info {
            background: #f8d7da;
            border-left: 6px solid #dc3545;
            padding: 16px;
            border-radius: 4px;
            margin-top: 16px;
        }

        .button {
            display: inline-block;
            margin-top: 24px;
            padding: 14px 24px;
            background: #dc3545;
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
        <h1>⚠ Low Stock Alert</h1>
    </div>

    <div class="content">
        <p>Hi Admin,</p>

        <p>
            This is an automated alert from <strong>SwiftCart</strong>. One of your products has reached a low stock level and may need restocking.
        </p>

        <div class="product-info">
            <p><strong>Product:</strong> {{ $product->name }}</p>
            <p><strong>Current Stock:</strong> {{ $product->stock_quantity }}</p>
        </div>

        <p>
            Please restock this product as soon as possible to avoid running out.
        </p>

        <p>
            This is an automated notification. No reply is needed.
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
