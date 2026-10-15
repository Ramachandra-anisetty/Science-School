@extends('school-science.layouts.school')

@section('head')
  <title>GITAM School of Science, Visakhapatnam Campus</title>
  <meta name="description" content="Explore B.Sc, BCA, and postgraduate programmes at GITAM School of Science, Visakhapatnam." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="{{ route('school-science.visakhapatnam') }}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="GITAM Deemed to be University" />
  <meta property="og:title" content="GITAM School of Science, Visakhapatnam Campus" />
  <meta property="og:description" content="Explore B.Sc, BCA, and postgraduate programmes at GITAM School of Science, Visakhapatnam." />
  <meta property="og:url" content="{{ route('school-science.visakhapatnam') }}" />
  <meta property="og:image" content="{{ asset('assets/school-science/images/Logos-86.png') }}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="GITAM School of Science, Visakhapatnam Campus" />
  <meta name="twitter:description" content="Explore B.Sc, BCA, and postgraduate programmes at GITAM School of Science, Visakhapatnam." />
  <meta name="twitter:image" content="{{ asset('assets/school-science/images/Logos-86.png') }}" />
@endsection

@section('body')
@include('school-science.partials.visually-hidden-focusable')
@include('school-science.partials.header')
@include('school-science.partials.script-header')
@include('school-science.partials.gitam-quick-nav-bengaluru')
@include('school-science.partials.preload-student-ambassador')
@include('school-science.partials.chat-fab')
@include('school-science.partials.mob-nav-bengaluru')
@include('school-science.partials.mob-sheet-backdrop')
@include('school-science.partials.mob-sheet-bengaluru')
<main id="main-content">
  @include('school-science.partials.sec-campuses-visakhapatnam')
  @include('school-science.partials.preload-maxresdefault-visakhapatnam')
  @include('school-science.partials.sec-hero-visakhapatnam')
  @include('school-science.partials.sec-explore-visakhapatnam')
  @include('school-science.partials.sec-faculty-bengaluru')
  @include('school-science.partials.sec-faculty-videos')
  @include('school-science.partials.top-recruiters2-section')
  @include('school-science.partials.sec-campus-infra-visakhapatnam')
  @include('school-science.partials.preload-lab-nallamalla-sujith-benarzee')
  @include('school-science.partials.sec-hostels')
  @include('school-science.partials.preload-palaparthy-jayanand-richard')
  @include('school-science.partials.sec-placements')
  @include('school-science.partials.preload-news-2026-07-03')
  @include('school-science.partials.sec-news')
  @include('school-science.partials.sec-activities-visakhapatnam')
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
@endsection
