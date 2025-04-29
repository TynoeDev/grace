<?php
// Main index.php structure
?>
<!DOCTYPE html>
<html lang="en">
<?php include 'components/head.php'; ?>
<body>
    <?php include 'components/preloader.php'; ?>
    <?php include 'components/header.php'; ?>

    <!-- Full Page ================================================= -->
    <div id="fullpage">
        <?php include 'components/sections/intro.php'; ?>
        <?php include 'components/sections/about.php'; ?>
        <?php include 'components/sections/works.php'; ?>
        <?php include 'components/sections/gallery.php'; ?>
        <?php include 'components/sections/achievements.php'; ?>
        <?php include 'components/sections/events.php'; ?>
        <?php include 'components/sections/contact.php'; ?>
    </div>
    <!--Fullpage Ends-->

    <?php include 'components/modals/gallery-modals.php'; ?>
    <?php include 'components/fixed-elements.php'; ?>
    <?php include 'components/scripts.php'; ?>
</body>
</html>
