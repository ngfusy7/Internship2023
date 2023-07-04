<!--  Instruction:
      Option
        1. Show 3 slides ( has link inside each slide)
          ADA note :
          - First tab will focus on the first slide -> the next tab will move to the next active slide has link inside
          - The next tab will move out of the zone
          - To change slide, can navigate using keyboard left/right
        2. Show 1 slide
          ADA note :
          - First tab will focus on the first slide, the next tab will move out of the zone
          - To change slide, can navigate using keyboard left/right

        => Option 1 & 2 can't control the slide by tabbing in next/prev buttons ( Add customizeClass to turn on this function)

        3. Show 1 slide
          ADA note :
          - First tab will focus in the next/prev button -> Can control the slide by tabbing in next/prev buttons
          - Can navigate the slider using the keyboard like other options

      customizeClass:
        - auto-play : turn on auto play mode
        - allow-tab-btn : allow tabbing in the next/prev buttons

      nameSlider -> unique name for slide in case have > 2 modules on 1 page


      => how to load: {#
                        {% set option = 2 %}
                        {% set nameSlider = 'slider2' %}
                        {% set customizeClass = 'allow-tab' %}
                        {% include 'modules/ADA/mod-slider-ada.html' %}
                      #}
-->