using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TestMBH : MonoBehaviour {

	public int speed;
	private float test = 0.1f;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		this.transform.localRotation *= Quaternion.AngleAxis(this.speed, Vector3.up);
	}

	public void TestMethod( int   a) {

	}

	public void TestMethod2( int   a , int  foo ,     float  bar   ) {

	}
}
