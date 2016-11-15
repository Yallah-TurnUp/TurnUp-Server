//
// config file
// --------------------------------------------------
// customize the template function via this file
//

//
// countdown
// --------------------------------------------------
//

// [true, false] - countdown toggle
var _countdown_toggle =                           true;

// 2017[year] - 12[month] - 01[day]
var _countdown_date =                             [2017, 12, 1];

// [true, false] - utc time
var _countdown_utc =                              false;

//
// map (google map)
// https://maps.google.com/
// --------------------------------------------------
//

// [true, false] - enable or disable google map
// if we disable it, map will replace with a image that place at `static/img/item/map.jpg`
var _map_toggle =                                 true;

// change 'ABCDE12345' to be your google map api key, more info - https://developers.google.com/maps/documentation/javascript/
var _map_api =                                    'ABCDE12345';

// map latitude
var _map_latitude_longitude =                     [32.0853, 34.7818];

// map water color
var _map_water_color =                            '#1080f2';

//
// overlay
// --------------------------------------------------
//

// [true, false] - overlay toggle
var _site_bg_overlay_toggle =                     true;

// [rgba format], home section overlay color
var _site_bg_overlay_color =                      'rgba(0, 0, 0, 0.6)';

//
// background
// --------------------------------------------------
//
// choose background version for both desktop and mobile :)
//

// for desktop
var _bg_style_desktop =                           1;
                                                    // 1 = single image  - image place at `static/img/bg/site-bg-img.jpg`
                                                    // 2 = slideshow     (fade animation) - image place at `static/img/bg/site-bg-slideshow-01.jpg - ...02.jpg`
                                                    // 3 = slideshow     (kenburn animation) - image place at `static/img/bg/site-bg-slideshow-01.jpg - ...02.jpg`
                                                    // 4 = html5 video   (mute) - video file place at `static/video/video.mp4`
                                                    // 5 = html5 video   (video audio) - video file place at `static/video/video.mp4`
                                                    // 6 = youtube video (mute)
                                                    // 7 = youtube video (video audio)

// for mobile
var _bg_style_mobile =                            1;
                                                    // 1 = single image - image place at `static/img/bg/site-bgimg.jpg`
                                                    // 2 = slideshow    (fade animation) - image place at `static/img/bg/site-bg-slideshow-01.jpg - ...02.jpg`
                                                    // 3 = slideshow    (kenburn animation) - image place at `static/img/bg/site-bg-slideshow-01.jpg - ...02.jpg`

//
// if `_bg_style_...` == 2 - 3 (slideshow)
// --------------------------------------------------
//

// slideshow image amount, image place at `static/img/bg/site-bg-slideshow-01.jpg - ...10.jpg...15.jpg`
var _bg_slideshow_image_amount =                  0;

// [millisecond] - slideshow duration time
var _bg_slideshow_duration =                      9000;

//
// if `_bg_style_desktop` == 6 - 7 (youtube video)
// --------------------------------------------------
//

// youtube video url id, https://www.youtube.com/watch?v=4gqR6Sy7s4E
var _bg_video_youtube_url =                       '4gqR6Sy7s4E';

// [hightres, hd1080, hd720, default] - youtube video quality
var _bg_video_youtube_quality =                   'hightres';

// [seconds] - video start time
var _bg_video_youtube_start =                     0;

// [seconds] - video end time, 0 to ignored
var _bg_video_youtube_end =                       0;

// [true, false] - loop video
var _bg_video_youtube_loop =                      true;

//
// animation
// --------------------------------------------------
//

// 0 - disable, 1 - constellation, 2 - parallax star, 3 - particles
var _site_bg_animation =                          2;

// [true / false] - enable / disable parallax effect on `constellation` and `parallax star`
var _side_bg_effect_parallax =                    true;

//
// if `_site_bg_animation` == 1 (constellation)
// --------------------------------------------------
//

// [rgba format] - constellation color
var _constellation_color =                        'rgba(255, 255, 255, .9)';

// px - constellation width
var _constellation_width =                        1.5;

//
// if `_site_bg_animation` == 2 (parallax star)
// --------------------------------------------------
//

// 0.1 to 1 - parallax star opacity
var _parallax_star_opacity =                      1;

//
// if `_site_bg_animation` == 3 (particles)
// --------------------------------------------------
//

// 0.1 to 1 - particles opacity
var _particles_opacity =                          0.8;

// 0.1 to 1 - particles link opacity
var _particles_link_opacity =                     0;
