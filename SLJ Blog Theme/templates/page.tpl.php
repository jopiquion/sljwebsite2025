<div id="page-wrapper">
  <div id="page">

    <!-- Header Region -->
    <?php if ($page['header']): ?>
      <header id="header">
        <?php print render($page['header']); ?>
      </header>
    <?php endif; ?>

    <!-- Navigation -->
    <?php if ($main_menu || $secondary_menu): ?>
      <nav id="navigation">
        <?php if ($main_menu): ?>
          <div id="main-menu">
            <?php print theme('links__system_main_menu', array('links' => $main_menu)); ?>
          </div>
        <?php endif; ?>
        <?php if ($secondary_menu): ?>
          <div id="secondary-menu">
            <?php print theme('links__system_secondary_menu', array('links' => $secondary_menu)); ?>
          </div>
        <?php endif; ?>
      </nav>
    <?php endif; ?>

    <!-- Messages -->
    <?php print $messages; ?>

    <!-- Breadcrumb -->
    <?php if ($breadcrumb): ?>
      <div id="breadcrumb">
        <?php print $breadcrumb; ?>
      </div>
    <?php endif; ?>

    <!-- Blog Posts -->
    <div id="main-wrapper">
      <main id="main">

        <?php if ($title): ?>
          <h1 style="font-family: Montserrat, serif; color: #6C8E76" class="page-title"><?php print $title; ?></h1>
        <?php endif; ?>

        <div id="blog-posts">
          <?php if (!empty($page['content'])): ?>
            <?php print render($page['content']); ?>
          <?php else: ?>
            <p>No blog posts available at the moment. Please check back later.</p>
          <?php endif; ?>
        </div>

      </main>
    </div>

    <!-- Sidebar (Optional) -->
    <?php if ($page['sidebar_first']): ?>
      <aside id="sidebar-first">
        <?php print render($page['sidebar_first']); ?>
      </aside>
    <?php endif; ?>

    <!-- Footer -->
    <?php if ($page['footer']): ?>
      <footer id="footer">
        <?php print render($page['footer']); ?>
      </footer>
    <?php endif; ?>

  </div>
</div>
