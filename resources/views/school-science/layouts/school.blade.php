<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  @yield('head')
  <link rel="shortcut icon" href="{{ asset('assets/components/base/assets/favicon.ico') }}" type="image/x-icon" />
  <link rel="preload" href="{{ asset('assets/components/base/assets/fonts/Inter-Variable-Latin.woff2') }}" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="{{ asset('assets/components/base/assets/fonts/FormaDJRDisplay-Bold-Testing.woff') }}" as="font" type="font/woff" crossorigin />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
  <link rel="stylesheet" href="{{ asset('assets/components/base/base.css') }}" />
  <link rel="stylesheet" href="{{ asset('assets/components/header/header.css') }}" />
  <link rel="stylesheet" href="{{ asset('assets/components/footer/footer.css') }}" />
  <link rel="stylesheet" href="{{ asset('assets/school-science/css/school-science.css') }}" />
</head>
<body>
@yield('body')
</body>
</html>
