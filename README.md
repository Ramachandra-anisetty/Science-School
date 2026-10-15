# School of Science - Laravel Blade

Copy into the Laravel app:

| From | To |
|---|---|
| `resources/views/school-science/` | `resources/views/school-science/` |
| `public/assets/school-science/` | `public/assets/school-science/` |
| `public/assets/components/` | `public/assets/components/` |
| `routes/school-science.php` | `routes/school-science.php`, then add `require __DIR__.'/school-science.php';` to `routes/web.php` |

## Pages

| View | URL | Route name |
|---|---|---|
| `home` | `/school-science` | `school-science.home` |
| `bengaluru` | `/school-science/bengaluru` | `school-science.bengaluru` |
| `hyderabad` | `/school-science/hyderabad` | `school-science.hyderabad` |
| `visakhapatnam` | `/school-science/visakhapatnam` | `school-science.visakhapatnam` |
| `programme-details` | `/school-science/programmes/details` | `school-science.programme-details` |

## Notes

- Views are plain Blade: `@extends`, `@section`, `@include`, `{{ asset() }}` and `{{ route() }}`. No inline CSS,
  inline JS or PHP.
- Layout: `school-science/layouts/school`. Each page fills `@section('head')` (title, meta, preloads) and
  `@section('body')`. Page sections are partials in `school-science/partials/`; header, footer, modals and the
  campus pages' shared sections are shared between pages.
- CSS load order (in the layout head): Bootstrap 5.3.3 from jsDelivr (with SRI), `components/base/base.css`,
  `components/header/header.css`, `components/footer/footer.css`, `school-science/css/school-science.css`.
- Scripts are external files under `public/assets/school-science/js` and `public/assets/components`.
- Assets live under `public/assets/` so the page URLs (`/school-science/...`) do not collide with a real directory.
- Asset URLs use `asset()`. Version them with your build (Mix/Vite) or `?v=` as you prefer.
