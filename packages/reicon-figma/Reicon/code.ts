// Reicon Figma Plugin Backend Script
figma.showUI(__html__, { width: 560, height: 640, themeColors: true });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'open-url') {
    figma.openExternal(msg.url);
    return;
  }

  if (msg.type === 'resize-window') {
    figma.ui.resize(msg.width, msg.height);
    return;
  }

  if (msg.type === 'insert-icon') {
    const { svg, name, size } = msg;

    try {
      // 1. Create a frame from the SVG code
      // Note: figma.createNodeFromSvg returns a FrameNode containing vector children
      const node = figma.createNodeFromSvg(svg);
      node.name = `Reicon / ${name}`;

      // 2. Scale the icon to the requested size (default is 24px)
      const scaleFactor = size / 24;
      node.resize(size, size);
      
      // Scale all children inside the SVG frame
      for (const child of node.children) {
        child.x = child.x * scaleFactor;
        child.y = child.y * scaleFactor;
        if ('resize' in child) {
          (child as unknown as { resize(width: number, height: number): void }).resize(child.width * scaleFactor, child.height * scaleFactor);
        }
      }

      // 3. Position the node (in selection if a frame is selected, otherwise viewport center)
      const selection = figma.currentPage.selection;
      if (selection.length === 1 && (selection[0].type === 'FRAME' || selection[0].type === 'SECTION' || selection[0].type === 'GROUP')) {
        const container = selection[0];
        (container as FrameNode | SectionNode | GroupNode).appendChild(node);
        node.x = (container.width - size) / 2;
        node.y = (container.height - size) / 2;
      } else {
        const center = figma.viewport.center;
        node.x = center.x - size / 2;
        node.y = center.y - size / 2;
      }

      // 4. Select and focus the new node
      figma.currentPage.selection = [node];
      figma.notify(`Inserted ${name} (${size}px) successfully!`);
    } catch (err) {
      console.error(err);
      figma.notify('Error inserting icon: ' + (err as Error).message, { error: true });
    }
  }
};
