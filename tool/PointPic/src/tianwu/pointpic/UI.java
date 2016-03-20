package tianwu.pointpic;

import java.awt.EventQueue;
import java.awt.FileDialog;
import java.awt.Point;

import javax.imageio.ImageIO;
import javax.swing.JFrame;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.awt.Canvas;
import java.awt.Color;
import java.awt.BorderLayout;
import javax.swing.JToolBar;

import io.korhner.asciimg.image.AsciiImageConverter;
import io.korhner.asciimg.image.AsciiImgCache;

import java.awt.Button;
import java.awt.Panel;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.TextField;

public class UI {

	private JFrame frame;
	private ArrayList<Point> picPoints = new ArrayList<Point>();
	
	private Image image=null;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					UI window = new UI();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public UI() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		
		frame.setBounds(0, 0, 1366, 768);
		frame.setResizable(false);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		Canvas canvas = new Canvas(){
			/**
			 * 
			 */
			private static final long serialVersionUID = 1L;
			public void paint(Graphics g){
				if(image!=null){
					int width = image.getWidth(null);
					int height = image.getHeight(null);
					if(width>1366-30){
						height =(int)( height*((float)(1366-30)/(float)width));
						width = 1366-30;
					}
					if(height>768-100){
						width =(int)( width*((float)(768-100)/(float)height));
						height = 768-100;
					}//等比缩放
					g.drawImage(image, 10, 10, width,height,null);
				}
				g.setColor(Color.BLACK);
				for(Point p:picPoints){
					g.fillRect(p.x,p.y, 5, 5);
				}
				g.drawString("Point Number:"+Integer.toString(picPoints.size()), 10, 10);
			}
		};
		canvas.setBackground(new Color(255, 255, 255));
		canvas.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent me) {
				picPoints.add(me.getPoint());
				canvas.update(canvas.getGraphics());
			}
		});
		
		frame.getContentPane().add(canvas, BorderLayout.CENTER);
		
		
		JToolBar toolBar = new JToolBar();
		frame.getContentPane().add(toolBar, BorderLayout.NORTH);
		
		Panel panel = new Panel();
		toolBar.add(panel);
		panel.setLayout(new FlowLayout(FlowLayout.LEFT, 5, 5));
		
		Button button_1 = new Button("\u6E05\u9664\u5C4F\u5E55");
		button_1.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
				picPoints.clear();
				canvas.update(canvas.getGraphics());
			}
		});
		
		Button button_2 = new Button("\u6DFB\u52A0\u56FE\u7247");
		button_2.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
				FileDialog fd = new FileDialog(frame,"选择图片");
				fd.setVisible(true);
				String file = fd.getDirectory()+fd.getFile();
				try {
					image = ImageIO.read(new File(file));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				canvas.update(canvas.getGraphics());
				
			}
		});
		panel.add(button_2);
		
		Button button_3 = new Button("\u70B9\u9635\u56FE\u7247");
		button_3.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
				BufferedImage input = (BufferedImage) image;
				Font font = new Font("Courier", Font.PLAIN, 6);
				AsciiImgCache cache = AsciiImgCache.create(font);
				AsciiImageConverter imgConverter = new AsciiImageConverter(cache);
				image = imgConverter.convertImage(input);
				canvas.update(canvas.getGraphics());
			}
		});
		panel.add(button_3);
		panel.add(button_1);
		
		TextField textField = new TextField();
		textField.setText("d:\\MyCode\\Html\\ForYou\\data.js");
		
		TextField textField_1 = new TextField();
		textField_1.setText("myTest");
		
		Button button = new Button("\u751F\u6210\u6587\u6863");
		button.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent arg0) {
				new JSFile(textField_1.getText(),picPoints).openFile(textField.getText()).writePoints().closeFile();
			}
		});
		panel.add(button);
		
		
		textField_1.setColumns(10);
		panel.add(textField_1);
		
		textField.setColumns(100);
		panel.add(textField);
	}

}
