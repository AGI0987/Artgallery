

var $ = jQuery

$(document).ready(function() {

    $('.as-slider').each(function() {

        var $this = $(this), currentSlide = 0, previousSlide = 0, slideNumber = $this.find('.as-side-slider .swiper-slide:not(.swiper-slide-duplicate)').length, barHTML = '', forward, textContainer = $this.find('.as-changing-widget')

        for (var i = 0; i < slideNumber; i++) {

            barHTML += `<span class="dot"><span class="dot-number">${i + 1}</span></span>`
        }

        $this.find('.as-bar .dot').remove()
        $this.find('.as-bar').append(barHTML)
        $this.find('.as-bar .dot').eq(0).addClass('active')

        textContainer.each(function() {
            var texts = $(this).find('.elementor-widget').eq(0)
            texts.addClass('currentUp')
            $(this).css('--h', texts.height() + 'px')
        })

        setTimeout(function() {
            $this.addClass('loaded')

            if ($this.find('.as-side-slider .swiper-container-initialized, .as-side-slider .swiper-initialized').length) {
                $this.find('.as-side-slider').addClass('loaded')
            }

            var init = setInterval(function() {
                if ($this.find('.as-side-slider .swiper-container-initialized, .as-side-slider .swiper-initialized').length) {

                    $this.find('.as-side-slider').addClass('loaded')
                    clearInterval(init)
                }
            }, 50)
        }, 500)

        var bgs = JSON.parse($this.attr('data-settings')).background_slideshow_gallery
          , bgHTML = '<div class="as-slider-background">'

        if (bgs) {
            bgs.forEach(function(background) {
                bgHTML += `<img decoding="async" src="${background.url}"/>`
            })
        }
        bgHTML += '</div>'

        $this.find('.as-slider-background').remove()
        $this.prepend(bgHTML)

        var backgrounds = $this.find('.as-slider-background img')

        backgrounds.eq(0).addClass('currentForward')

        setInterval(function() {
            currentSlide = $this.find('.as-side-slider .swiper-slide-active').attr('data-swiper-slide-index')
            if (previousSlide != currentSlide) {

                if (previousSlide < currentSlide) {
                    forward = true
                }
                if (previousSlide > currentSlide) {
                    forward = false
                }
                if (previousSlide == slideNumber - 1 && currentSlide == 0) {
                    forward = true
                }
                if (previousSlide == 0 && currentSlide == slideNumber - 1) {
                    forward = false
                }
                textContainer.each(function() {
                    var texts = $(this).find('.elementor-widget')

                    $(this).css('--h', texts.eq(currentSlide).height() + 'px')

                    texts.removeClass('prev next currentUp currentDown')
                    backgrounds.removeClass('prev currentBackward currentForward')

                    backgrounds.eq(previousSlide).addClass('prev')

                    if (forward) {
                        texts.eq(previousSlide).addClass('prev')
                        texts.eq(currentSlide).addClass('currentUp')

                        backgrounds.eq(currentSlide).addClass('currentForward')

                    } else {
                        texts.eq(previousSlide).addClass('next')
                        texts.eq(currentSlide).addClass('currentDown')

                        backgrounds.eq(currentSlide).addClass('currentBackward')
                    }
                })

                $this.find('.as-bar .dot').removeClass('active')
                $this.find('.as-bar .dot').eq(currentSlide).addClass('active')
            }
            previousSlide = currentSlide
        }, 500)

        $this.find('.as-bar .dot').on('click', function() {

            var index = $(this).index()

            $this.find('.as-side-slider .swiper-pagination-bullet').eq(index).trigger('click')
            $this.find('.as-side-slider .swiper-container').trigger('mouseleave')

        })
        $this.find('.as-slider-left').on('click', function() {

            $this.find('.as-side-slider .elementor-swiper-button-prev').trigger('click')
            $this.find('.as-side-slider .elementor-swiper').trigger('mouseleave')
        })
        $this.find('.as-slider-right').on('click', function() {

            $this.find('.as-side-slider .elementor-swiper-button-next').trigger('click')
            $this.find('.as-side-slider .elementor-swiper').trigger('mouseleave')
        })
        $this.find('.as-slider-left a, .as-slider-right a').on('click', function(e) {

            e.preventDefault()
        })

    })
})

$(window).on('resize', function() {

    $('.as-slider').each(function() {

        var textContainer = $(this).find('.as-changing-widget')

        textContainer.each(function() {
            var texts = $(this).find('.elementor-widget.currentUp, .elementor-widget.currentDown')

            $(this).css('--h', texts.height() + 'px')
        })
    })
})
