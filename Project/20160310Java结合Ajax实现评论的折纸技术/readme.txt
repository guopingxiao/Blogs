����Ա����������Ҫ���ǣ����ã�����
java javascript html5/css3 
���ݿ�--�������ݿ⣬�ǹ�ϵ�����ݿ�

��Ŀ��Ajaxʵ��������ֽ����

ǰ�ˣ�css3+javascript
��ˣ�java+mysql+jsp

�������ߣ�Sublime �ȸ������

���ļ�����Ajax+css3

���裺
      1������һ��comment.html
	  2��ʵ�������۵�
	  3���½�javaweb����xgp_comment
	  4���½����� comment��
	  5��ͨ��Ajax�������۲�ѯ������
	  

	  
����Ҫ��
1��background��background-color��
   background����background-color�����Ǳ�������Ҫд������Ȼ�����Ҫд����ϸһ�㣬ɧ��һ�㣬
   Ҳ������background-color��������ɫ~һ��Ļ�ֱ����background�Ϳ����ˣ������ڶ�����ɫ��ʱ������ȫһ��
2��/*margin:20px auto; ������ͱ�ʾ�ϵľ���ֵ�͸�������20px�������Ҿ����Զ���Ӧ��Ҳ�������ǳ�˵���Զ����С�*/
3��headerȡ������ɫ�� .header .imgbox{} ��ôд��ʽ���������������ʽ ��߳ſ�����ģ������Ͳ����ظ�д��
4���ı���������text-indent:2em   �и�Line Height����
5�����ݵĲ��ּ��������۲��֡�--����1������ͬ�ĸ߶�ȥ����
6��commentbox�Ӿ��Զ�λ  css3��ת���ԡ� ����--��ͼ--

    <div class="commentbox"><!--����600-800Ϊ��-->
    	<h1>������������Ŷ������</h1>
    	<div style="transform: rotateX(45deg);"><!--�ӵ�-->
    		<span>����һ</span><!--��������ͬ-->
    		<div style="transform: rotateX(-90deg);">
	    		<span>���ݶ�</span>
	    		<div style="transform: rotateX(90deg);">
		    		<span>������</span>
		    		<div style="transform: rotateX(-90deg);">
			    		<span>������</span>
			    	</div>
		    	</div>
	    	</div>

    	</div>
7�������۵Ĵ��������ڱ���ĺ��棿

8.<a href="javascript:void(0)" id="expand">չ��</a>�ó�����ʧЧ
2. a href="javascript:void(0);" onclick="js_method()"

���ַ����Ǻܶ���վ��õķ�����Ҳ������ȫ�ķ�����onclick��������ִ��js��������void��һ����������void(0)����undefined����ַ��������ת���������ַ����������һ�ַ���һ��ֱ�ӽ�js������¶���������״̬����

3.a href="javascript:;" onclick="js_method()"

���ַ�������2�����ƣ�����ֻ��ִ����һ���յ�js���롣

4.a href="#" onclick="js_method()"

���ַ���Ҳ�����Ϻܳ����Ĵ��룬#�Ǳ�ǩ���õ�һ������������top�����á����������ַ����������ҳ�󷵻ص�ҳ�����ˡ�

5.a href="#" onclick="js_method();return false;"

���ַ������ִ����js������return false��ҳ�治������ת��ִ�к�����ҳ��ĵ�ǰλ�á�

�ҿ�����taobao����ҳ�����ǲ��õ��ǵ�2�ַ�������alibaba����ҳ�ǲ��õĵ�1�ַ����������ǵ�������ÿ��href���javascript��������try��catch��Χ��

�ۺ���������a�е���js�������ʵ��ķ����Ƽ�ʹ�ã�
a href="javascript:void(0);" onclick="js_method()"
a href="javascript:;" onclick="js_method()"
a href="#" onclick="js_method();return false;"


9����Զ�λ��������Լ�ԭ����λ�ӽ���ƫ�Ƶģ���