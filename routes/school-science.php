<?php

use Illuminate\Support\Facades\Route;

Route::view('/school-science', 'school-science.pages.home')->name('school-science.home');
Route::view('/school-science/bengaluru', 'school-science.pages.bengaluru')->name('school-science.bengaluru');
Route::view('/school-science/hyderabad', 'school-science.pages.hyderabad')->name('school-science.hyderabad');
Route::view('/school-science/visakhapatnam', 'school-science.pages.visakhapatnam')->name('school-science.visakhapatnam');
Route::view('/school-science/programmes/details', 'school-science.pages.programme-details')->name('school-science.programme-details');
