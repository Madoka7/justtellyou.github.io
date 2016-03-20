package tianwu.pointpic;

import java.awt.Point;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;

public class JSFile {
	private String picName;
	private ArrayList<Point> picPoints;
	private OutputStreamWriter osw;
	
	public JSFile(String name,ArrayList<Point> points){
		this.picName = name;
		this.picPoints = points;
	}
	public JSFile openFile(String fileName){
		try{
			File file = new File(fileName);
			if(file.createNewFile())
				osw = new OutputStreamWriter(new FileOutputStream(file),"UTF-8");
			else
				osw = new OutputStreamWriter(new FileOutputStream(file,true),"UTF-8");
		}catch(IOException e){
			System.out.println(e.getMessage());
		}
		return this;
	}
	public JSFile writePoints(){
		
		while(picPoints.size()<99)
		{
			picPoints.add(new Point(300,300));
		}
		
		try {
			osw.write("var "+picName+"Xs"+" = [");//写入数组X的坐标
			for(Point point:picPoints){
				osw.write(
						Integer.toString(point.x)+","
						);
			}
			osw.write("];\n");
			
			osw.write("var "+picName+"Ys"+" = [");//写入数组Y的坐标
			for(Point point:picPoints){
				osw.write(
						Integer.toString(point.y)+","
						);
			}
			osw.write("];\n");
			
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		return this;
	}
	public void closeFile(){
		try{
			osw.flush();
			osw.close();
		}catch(IOException e){
			System.out.println(e.getMessage());
		}
	}
}
