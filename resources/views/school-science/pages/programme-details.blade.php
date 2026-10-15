@extends('school-science.layouts.school')

@section('head')
  <title>B.Sc. Chemistry | GITAM School of Science, Visakhapatnam</title>
  <meta name="description" content="Explore the B.Sc. (Hons.) / (Hons. with Research) in Chemistry programme at GITAM School of Science, Visakhapatnam campus — eligibility, curriculum, fees, scholarships and career outcomes." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="{{ route('school-science.programme-details') }}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="GITAM Deemed to be University" />
  <meta property="og:title" content="B.Sc. Chemistry | GITAM School of Science, Visakhapatnam" />
  <meta property="og:description" content="Explore the B.Sc. (Hons.) / (Hons. with Research) in Chemistry programme at GITAM School of Science, Visakhapatnam campus — eligibility, curriculum, fees, scholarships and career outcomes." />
  <meta property="og:url" content="{{ route('school-science.programme-details') }}" />
  <meta property="og:image" content="{{ asset('assets/school-science/images/Logos-86.png') }}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="B.Sc. Chemistry | GITAM School of Science, Visakhapatnam" />
  <meta name="twitter:description" content="Explore the B.Sc. (Hons.) / (Hons. with Research) in Chemistry programme at GITAM School of Science, Visakhapatnam campus — eligibility, curriculum, fees, scholarships and career outcomes." />
  <meta name="twitter:image" content="{{ asset('assets/school-science/images/Logos-86.png') }}" />
@endsection

@section('body')
@include('school-science.partials.visually-hidden-focusable')
@include('school-science.partials.header')
@include('school-science.partials.script-header')
@include('school-science.partials.gitam-quick-nav-programme-details')
@include('school-science.partials.preload-student-ambassador')
@include('school-science.partials.chat-fab')
@include('school-science.partials.mob-nav-programme-details')
@include('school-science.partials.mob-sheet-backdrop')
@include('school-science.partials.mob-sheet-programme-details')
<main id="main-content">
  @include('school-science.partials.sec-campuses-visakhapatnam')
  @include('school-science.partials.gss-pd-breadcrumb')
  @include('school-science.partials.preload-hero-banner')
  @include('school-science.partials.sec-pdm-hero')
  @include('school-science.partials.sec-pdm-overview')
  @include('school-science.partials.sec-pdm-curriculum')
  @include('school-science.partials.sec-pdm-career')
  @include('school-science.partials.sec-pdm-multi')
  @include('school-science.partials.sec-pdm-infra')
  @include('school-science.partials.sec-pdm-fees')
  @include('school-science.partials.sec-pdm-scholarships-alt')
  @include('school-science.partials.admission-helpdesk')
  @include('school-science.partials.preload-logos-86')
  @include('school-science.partials.preload-scrolltop-arrow')
</main>
@include('school-science.partials.overlay')
@include('school-science.partials.g-footer')
@include('school-science.partials.script-footer')
@include('school-science.partials.contactmodal')
@include('school-science.partials.eventdetailsmodal')
@include('school-science.partials.applymodal')
@include('school-science.partials.script-page-scripts')
@include('school-science.partials.script-programme-details')
@endsection
