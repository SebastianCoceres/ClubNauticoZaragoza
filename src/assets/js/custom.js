$(function () {
  // MENU
  $(".navbar-collapse a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // AOS ANIMATION
  AOS.init({
    disable: "mobile",
    duration: 800,
    anchorPlacement: "center-bottom",
  });

  // SMOOTHSCROLL NAVBAR
  $(function () {
    $(".navbar a, .hero-text a").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49,
          },
          1000
        );
      event.preventDefault();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    type: "loop",
    perPage: 2,
    gap: "2rem",
    focus: "center",
    breakpoints: {
      1200: {
        perPage: 1,
        gap: ".7rem",
      },
      768: {
        perPage: 1,
        gap: ".7rem",
      },
    },
  });

  splide.mount();
});

function navbarImgToggle() {
  if (
    $(window).height() > 768 &&
    $(window).scrollTop() > $(".hero h1").offset().top
  ) {
    $(".hero h1").addClass("off");
    $(".navbar-brand__name").addClass("in");
    $(".navbar-brand__img").addClass("in");
  } else {
    $(".hero h1").removeClass("off");
    $(".navbar-brand__name").removeClass("in");
    $(".navbar-brand__img").removeClass("in");
  }
}

$(document).ready(function () {
  navbarImgToggle();
  $(document).on("scroll", function () {
    navbarImgToggle();
  });
});

/*Observer*/

function animationClicking(el) {
  $(el).toggleClass("in");
}

const aboutUsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animationClicking(entry.target);
      setInterval(() => {
        animationClicking(entry.target);
      }, 2000);
    } else {
      $(entry.target).removeClass("in");
    }
  });
}, {});

aboutUsObserver.observe($(".interaction-img")[0]);

/*Copy Btn*/
let copyBtn = document.querySelectorAll(".copyBtn");

async function copy(element, text) {
  let tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);
  document.body.removeChild(tempInput);
  await navigator.clipboard.writeText(tempInput.value);

  element.classList.add("in");
  setTimeout(() => {
    element.classList.remove("in");
  }, 1000);
}

copyBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    copy(e.target, e.target.outerText);
  });
});
